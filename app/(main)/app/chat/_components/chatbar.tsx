import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Bot, Dot } from "lucide-react";
import ChatSearch from "./chat-search";
import { AddMember } from "./add-member";
import { getFriendsByUserId } from "@/actions/friends";
import { auth } from "@/auth";
import FriendPreview from "./friend-preview";

const Chatbar = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;
  const friends = await getFriendsByUserId(userId);

  return (
    <div className="flex flex-col h-full w-[22rem] overflow-auto border-r-[1px] border-border py-[10px] px-2 space-y-2">
      <ChatSearch />
      <AddMember />
      {friends.length > 0 ? (
        <div className="flex flex-col space-y-2">
          {friends.map((content: any) => (
            <FriendPreview key={content.id} content={content} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center space-y-2">
            <Bot size={48} />
            <span className="font-semibold text-lg">No friends found</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbar;
