import { auth } from "@/auth";
import { db } from "@/lib/db";
import Mindsdb from "mindsdb-js-sdk";
import connect from "@/lib/create-mind";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const session = await auth();
        const currentUser = session?.user as any;

        if(!currentUser) {
            return new NextResponse("Unauthorized access", {status: 401});
        }

        const body = await req.json();

        const { 
            content,
            groupId,
            userId,
            messageId,
            friendId
        } = body;

        if(groupId){
            if(!content || !userId || !messageId) {
                return new NextResponse("Invalid request", {status: 400});
            }
    
            // TODO: check for the previous 5 messages from the current MessageId
            const messages = await db.message.findMany({
                where: {
                    groupId: groupId,
                    member: {
                        userId: userId
                    },
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 5
            });
    
            if(!messages) {
                return new NextResponse("Group not found", {status: 404});
            }
    
            // stringify the messages
            const messageContent = messages.map((message) => message.content).join(" ");
    
            await connect();
    
            const model = await Mindsdb.Models.getModel("sentiment", "mindsdb");
    
            if(!model) {
                return new NextResponse("Model not found", {status: 404});
            }
    
            const escapedContent = messageContent.replace(/'/g, "\\'");
    
            const queryOptions = {
                where: [`text = '${escapedContent}'`]
            }
    
            const response = await model.query(queryOptions);
            const data = response.data as any;
    
            if(!data) {
                return new NextResponse("Sentiment not found", {status: 404});
            }
    
            const sentiment = data.answer;
    
            return new NextResponse(sentiment, {status: 200});
        }
        else if(friendId){
            if(!content || !userId || !messageId) {
                return new NextResponse("Invalid request", {status: 400});
            }

            const messages = await db.directMessage.findMany({
                where: {
                    friendshipId: friendId,
                    senderId: userId
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 5
            });

            if(!messages) {
                return new NextResponse("Friendship not found", {status: 404});
            }

            // stringify the messages
            const messageContent = messages.map((message) => message.content).join(" ");

            await connect();

            const model = await Mindsdb.Models.getModel("sentiment", "mindsdb");

            if(!model) {
                return new NextResponse("Model not found", {status: 404});
            }

            const escapedContent = messageContent.replace(/'/g, "\\'");

            const queryOptions = {
                where: [`text = '${escapedContent}'`]
            }

            const response = await model.query(queryOptions);

            const data = response.data as any;

            if(!data) {
                return new NextResponse("Sentiment not found", {status: 404});
            }

            const sentiment = data.answer;

            return new NextResponse(sentiment, {status: 200});
        }
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}