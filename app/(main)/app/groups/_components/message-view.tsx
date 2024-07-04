"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { format } from "date-fns";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface MessageViewProps {
  type: "group" | "direct";
  id: string;
  messages: any;
}

const MessageView = ({ type, id, messages }: MessageViewProps) => {
  const user = useCurrentUser();

  const userId = user?.id as string;
  console.log(messages);

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 h-full flex flex-col pt-4 px-4 overflow-y-auto">
      {messages.map((message: any) => (
        <div
          key={message.id}
          className={`flex flex-col w-full items-${
            message.member.user.id === userId ? "end" : "start"
          } mb-4`}
        >
            <div
              className={`flex items-center py-2 w-full ${
                message.member.user.id === userId
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-semibold`}
              >
                <Avatar>
                  <AvatarImage
                    src={message.member.user.image}
                    alt={message.member.user.username}
                  />
                  <AvatarFallback>
                    {message.member.user.username}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`flex px-4 flex-col h-full justify-between ${
                  message.member.user.id === userId
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div className="text-xs text-gray-500">
                  {message.member.user.username}
                </div>
                <div className={`flex items-end rounded-lg text-sm`}>
                  {message.content}
                </div>
              </div>
              <div className="text-xs text-gray-500 h-full flex items-end">
                {format(new Date(message.createdAt), "p")}
              </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageView;
