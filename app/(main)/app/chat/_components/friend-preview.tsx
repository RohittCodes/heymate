"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Bot, Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FriendPreviewProps {
  content: any;
}

const FriendPreview = ({ content }: FriendPreviewProps) => {
  const user = useCurrentUser();

  // console.log(content.directMessages);

  if (!user) return null;

  if(content.status === "REJECTED") return null;

  if (content.requesterId === user.id) {
    return (
      <Link href={`/app/chat/${content.id}`}>
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
            <Image src={content.requestee.image} width={32} height={32} alt="Avatar" className="rounded-full" />
            </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {content.requestee.username}
            </span>
            {content.status === "PENDING" && (
              <span className="text-xs text-gray-500">Friend request sent</span>
            )}
            {
              content.status === "ACCEPTED" && (
                <div>
                  {
                    content.directMessages.length > 0 ? (
                      <span className="text-xs text-gray-500">
                        {content.directMessages[0].content}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">
                        No messages
                      </span>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/app/chat/${content.id}`}>
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
            <Image src={content.requester.image} width={32} height={32} alt="Avatar" className="rounded-full" />
            </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {content.requester.username}
            </span>
            {content.status === "PENDING" && (
              <span className="text-xs text-gray-500">
                Friend request pending
              </span>
            )}
            {
              content.status === "ACCEPTED" && (
                <div>
                  {
                    content.directMessages.length > 0 ? (
                      <span className="text-xs text-gray-500">
                        {content.directMessages[0].content}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">
                        No messages
                      </span>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </Link>
    );
  }
};

export default FriendPreview;
