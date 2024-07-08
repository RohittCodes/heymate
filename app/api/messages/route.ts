import { auth } from "@/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import connect from "@/lib/create-mind";
import { getUserByUsername } from "@/data/user";

export async function POST (req: Request, res: Response) {
    try {
        const session = await auth();
        const currentUser = session?.user as any;
        
        if(!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();

        const {
            message,
            fileUrl,
            type,
            id
        } = body;

        if(!message && !fileUrl) {
            return new NextResponse("Bad Request", { status: 400 });
        }
        
        if(type === "group") {
            const group = await db.group.findUnique({
                where: {
                    id
                },
                include: {
                    members: true
                }
            });

            if(!group) {
                return new NextResponse("Not Found", { status: 404 });
            }

            const getMember = group.members.find((member) => member.userId === currentUser.id);

            if(!getMember) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            // Bots are mentioned in the group with @ symbol and their username. Grab the username and check if it's a bot

            const mentionedUsers = message.match(/@(\w+)/g);

            if(mentionedUsers) {
                for(const user of mentionedUsers) {
                    const username = user.replace("@", "");
                    const mentionedUser = await getUserByUsername(username);

                    if(!mentionedUser) {
                        return new NextResponse("Not Found", { status: 404 });
                    }

                    if(mentionedUser.isBot){
                        // Connect to MindsDB
                        // Query the model
                        // Return the prediction
                        // Store the prediction in the database
                        // Trigger the pusherServer to send the message to the user
                    }
                }
            }

            const newMessage = await db.message.create({
                data: {
                    content: message,
                    imageUrl: fileUrl,
                    groupId: id,
                    memberId: getMember?.id
                },
                include: {
                    member: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            
            if (!newMessage) {
                return new NextResponse("Internal Server Error", { status: 500 });
            }

            // console.log(newMessage);
            
            pusherServer.trigger(toPusherKey(`group:${id}`), "group-message", newMessage);
            
            // Return the new message directly
            return new NextResponse(JSON.stringify(newMessage), { status: 201 });            
        } else if(type === "direct") {
            const friendship = await db.friendship.findUnique({
                where: {
                    id
                },
                include: {
                    requester: true,
                    requestee: true
                }
            });
            
            if(!friendship) {
                return new NextResponse("Not Found", { status: 404 });
            }

            if(friendship.requesterId !== currentUser.id && friendship.requesteeId !== currentUser.id) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            if(friendship.requestee.isBot) {
                await connect();

                const model = await MindsDB.Models.getModel("minds_endpoint_model", "mindsdb");

                if(!model) {
                    return new NextResponse("Model not found", { status: 404 });
                }

                const queryOptions = {
                    where: [`text = '${message}'`]
                };

                const response = await model.query(queryOptions);
                const data = response.data as any;

                if(!data) {
                    return new NextResponse("No prediction found", { status: 404 });
                }
                
                console.log(data);

                // Return the prediction and store it in the database

                // trigger the pusherServer to send the message to the user

                return new NextResponse(JSON.stringify(data), { status: 200 });
            }

            const newMessage = await db.directMessage.create({
                data: {
                    content: message,
                    fileUrl,
                    friendshipId: id,
                    senderId: currentUser.id
                },
                include: {
                    friendship: true,
                    sender: true
                }
            });

            if (!newMessage) {
                return new NextResponse("Internal Server Error", { status: 500 });
            }

            // console.log(newMessage);

            pusherServer.trigger(toPusherKey(`direct:${id}`), "direct-message", newMessage);

            // Return the new message directly
            return new NextResponse(JSON.stringify(newMessage), { status: 201 });
        }
    }
    catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}