import { getFriendshipById } from "@/actions/friends";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MessageView from "../../groups/_components/message-view";
import DirectMessageView from "../_components/message-view";
import SendDirectMessage from "../_components/send-message";

const ChatPage = async ({ params }: { params: { chat: string } }) => {
  const friendship = await getFriendshipById(params.chat);
  const session = await auth();
  const userId = session?.user?.id as string;

  // console.log(friendship);

  if (!friendship) {
    return <div>Friendship not found</div>;
  }

  if(friendship.requesterId !== userId && friendship.requesteeId !== userId) {
    return <div>Unauthorized</div>
  }

  if ((friendship.status === "PENDING" || friendship.status === "REJECTED") && friendship.requesteeId === userId) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div className="h-16 w-full border-b-[1px]">Navbar</div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-lg">Friend request pending</span>
            <span className="text-sm text-gray-500">
                {friendship.requester.username} wants to be friends with you
            </span>
            <div className="flex space-x-2">
                <form action={`/api/friends/${friendship.id}/accept`} method="POST">
                    <Button type="submit">Accept</Button>
                </form>
                <form action={`/api/friends/${friendship.id}/reject`} method="POST">
                    <Button type="submit" variant="destructive">Reject</Button>
                </form>
            </div>
          </div>
          </div>  
      </div>
    );
  }

  if ((friendship.status === "PENDING" || friendship.status === "REJECTED") && friendship.requesterId === userId) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div className="h-16 w-full border-b-[1px]">Navbar</div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center space-y-2">
            {
              friendship.status === "PENDING" && (
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg">Friend request sent</span>
            <span className="text-sm text-gray-500">
              Waiting for {friendship.requestee.username} to accept your request
            </span>
                </div>
              )
            }
            {friendship.status === "REJECTED" && (
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm text-gray-500">
                  {friendship.requestee.username} has rejected your friend request
                </span>
                <form action={`/api/friends/${friendship.id}/request`} method="POST">
                  <Button type="submit">Send another request</Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="h-16 w-full border-b-[1px]">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
              <Image
                src={
                  friendship.requesterId === userId
                    ? friendship.requestee.image
                    : friendship.requester.image
                }
                width={32}
                height={32}
                alt="Avatar"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                {friendship.requesterId === userId
                  ? friendship.requestee.username
                  : friendship.requester.username}
              </span>
            </div>
          </div>
          {/* TODO: Add dropdown menu and implement block/report functionality */}
          <div className="flex items-center space-x-2">
            <Button variant="destructive">Block</Button>
            <Button>Report</Button>
          </div>
        </div>
      </div>
      <DirectMessageView id={friendship.id} messages={friendship.directMessages} />
      <SendDirectMessage friendshipId={friendship.id} />
    </div>
  );
};

export default ChatPage;
