"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import Sentiment from "../../_components/sentiment";

interface MessageViewProps {
  type: "group";
  id: string;
  messages: any;
}

const MessageView = ({ type, id, messages }: MessageViewProps) => {

  const [messageView, setMessageView] = useState<any>(messages);
  const user = useCurrentUser();

  const userId = user?.id as string;
  // console.log(messages);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    pusherClient.subscribe(toPusherKey(`group:${id}`));

    const messageHandler = (message: any) => {
      setMessageView((prev: any) => [...prev, message]);

      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }

    pusherClient.bind("group-message", messageHandler);
    return () => {
      pusherClient.unsubscribe(toPusherKey(`group:${id}`));
      pusherClient.unbind("group-message", messageHandler);
    };
  }, [id]);

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "h:mm a");
  }
  
  return (
    <div className="flex-1 h-[calc(100%-20rem)] flex flex-col px-4 overflow-y-auto">
      {messageView.map((message: any) => (
        <div
          key={message.id}
          className={`flex flex-col w-full items-${
            message.member?.user?.id === userId ? "end" : "start"
          } mb-4`}
        >
            <div
              className={`flex items-center py-2 w-[70%] ${
                message.member?.user?.id === userId
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
            <div className={`flex items-center bg-muted px-3 gap-2 py-2 rounded-full  ${message.member?.user?.id === userId ? "flex-row-reverse" : "flex-row"}`}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-semibold`}
              >
                <Avatar>
                  <AvatarImage
                    src={message.member?.user?.image}
                    alt={message.member?.user?.username}
                  />
                  <AvatarFallback>
                    {message.member?.user?.username}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`flex pr-2 flex-col h-full justify-between ${
                  message.member?.user?.id === userId
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div className={`flex justify-between w-full items-center gap-4 ${message.member?.user?.id === userId ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-sm font-semibold">
                    {message.member?.user?.username}
                  </span>
                  <Sentiment content={message.content} groupId={id} userId={message.member?.user?.id} messageId={message.id} />
                </div>
                <div className={`flex items-end rounded-lg text-sm`}>
                  {message.content}
                </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 h-full flex items-end">
              {formatTimestamp(message.createdAt)}
              </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} className="pt-12" />
    </div>
  );
};

export default MessageView;
