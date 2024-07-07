"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface DirectMessageViewProps {
  id: string;
  messages: any;
}

const DirectMessageView = ({ id, messages }: DirectMessageViewProps) => {

  const [messageView, setMessageView] = useState<any>(messages);
  const user = useCurrentUser();

  const userId = user?.id as string;
  // console.log(messages);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    pusherClient.subscribe(toPusherKey(`direct:${id}`));

    const messageHandler = (message: any) => {
      // other data don't start with the name of the message, so don't include newMessage in the object name to avoid confusion
      setMessageView((prev: any) => [...prev, message]);
    }

    pusherClient.bind("direct-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`direct:${id}`));
      pusherClient.unbind("direct-message", messageHandler);
    };
  }, [id]);

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "h:mm a");
  }

  return (
    <div className="flex-1 h-full flex flex-col pt-4 px-4 overflow-y-auto">
      {messageView.map((message: any) => (
        <div
          key={message.id}
          className={`flex flex-col w-full items-${
            message.senderId === userId ? "end" : "start"
          } mb-4`}
        >
            <div
              className={`flex items-center py-2 w-full ${
                message.senderId === userId
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-semibold`}
              >
                <Avatar>
                  <AvatarImage
                    src={message.sender.image}
                    alt={message.sender.username}
                  />
                  <AvatarFallback>
                    {message.sender.username}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`flex px-4 flex-col h-full justify-between ${
                  message.senderId === userId
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div className="text-xs text-gray-500">
                  {message.sender.username}
                </div>
                <div className={`flex items-end rounded-lg text-sm`}>
                  {message.content}
                </div>
              </div>
              <div className="text-xs text-gray-500 h-full flex items-end">
              {formatTimestamp(message.createdAt)}
              </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default DirectMessageView;
