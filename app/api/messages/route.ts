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

        // use escape sequences for the message, prevent ' from breaking the query
        const escapedMessage = message.replace(/'/g, "\\'");
        
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

            const mentionedUser = message.match(/@(\w+)/g);

            if(mentionedUser) {
                for(const user of mentionedUser) {
                    const username = user.replace("@", "");
                    const mentionedUser = await getUserByUsername(username);

                    if(!mentionedUser) {
                        return new NextResponse("Not Found", { status: 404 });
                    }

                    // console.log(mentionedUser);
                    
                    const getBotId = group.members.find((member) => member.userId === mentionedUser.id);

                    if(!getBotId) {
                        return new NextResponse("Unauthorized", { status: 401 });
                    }

                    if(mentionedUser.isBot){
                        // Connect to MindsDB
                        await connect();

                        // Get the model
                        const model = await MindsDB.Models.getModel(`${mentionedUser.username}`, "mindsdb");

                        if(!model) {
                            return new NextResponse("Model not found", { status: 404 });
                        }

                        // Query the model
                        const queryOptions = {
                            where: [`text = '${escapedMessage}'`]
                        };

                        const response = await model.query(queryOptions);
                        const data = response.data as any;

                        if(!data) {
                            return new NextResponse("No prediction found", { status: 404 });
                        }

                        // Return the prediction
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

                        await pusherServer.trigger(toPusherKey(`group:${id}`), "group-message", newMessage);

                        const prediction = await db.message.create({
                            data: {
                                content: data.answer,
                                groupId: id,
                                memberId: getBotId?.id
                            },
                            include: {
                                member: {
                                    include: {
                                        user: true
                                    }
                                }
                            }
                        });

                        // console.log(data);

                        if (!prediction) {
                            return new NextResponse("Internal Server Error", { status: 500 });
                        }

                        await pusherServer.trigger(toPusherKey(`group:${id}`), "group-message", prediction);

                        return new NextResponse(JSON.stringify(data), { status: 200 });
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
            
            await pusherServer.trigger(toPusherKey(`group:${id}`), "group-message", newMessage);
            
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

                const model = await MindsDB.Models.getModel(`${friendship.requestee.username}`, "mindsdb");

                if(!model) {
                    return new NextResponse("Model not found", { status: 404 });
                }

                const queryOptions = {
                    where: [`text = '${escapedMessage}'`]
                };

                const response = await model.query(queryOptions);
                const data = response.data as any;

                if(!data) {
                    return new NextResponse("No prediction found", { status: 404 });
                }
                
                // console.log(data);

                // Return the prediction and store it in the database
                const newMessage = await db.directMessage.create({
                    data: {
                        content: message,
                        fileUrl,
                        friendshipId: id,
                        senderId: currentUser.id,
                    },
                    include: {
                        friendship: true,
                        sender: true
                    }
                });

                if (!newMessage) {
                    return new NextResponse("Internal Server Error", { status: 500 });
                }

                await pusherServer.trigger(toPusherKey(`direct:${id}`), "direct-message", newMessage);

                const prediction = await db.directMessage.create({
                    data: {
                        content: data.answer,
                        friendshipId: id,
                        senderId: friendship.requesteeId
                    },
                    include: {
                        friendship: true,
                        sender: true
                    }
                });

                if (!prediction) {
                    return new NextResponse("Internal Server Error", { status: 500 });
                }

                await pusherServer.trigger(toPusherKey(`direct:${id}`), "direct-message", prediction);

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

            await pusherServer.trigger(toPusherKey(`direct:${id}`), "direct-message", newMessage);

            // Return the new message directly
            return new NextResponse(JSON.stringify(newMessage), { status: 201 });
        }
    }
    catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}