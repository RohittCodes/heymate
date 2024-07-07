import { declineFriendRequest, getFriendshipById } from "@/actions/friends";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        const currentUser = session?.user as any;
        const id = params.id;

        console.log(id);

        const friendship = await getFriendshipById(id);
        
        if(!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!friendship) {
            return new NextResponse("Friendship not found", { status: 404 });
        }

        if(friendship.requesteeId !== currentUser.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await declineFriendRequest(id);
        
        // redirect to the chat page
        return NextResponse.redirect(new URL("/app/chat", req.url).toString());
    }
    catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}