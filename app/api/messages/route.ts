import { auth } from "@/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { NextResponse } from "next/server";

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

            console.log(newMessage);
            
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

            console.log(newMessage);

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