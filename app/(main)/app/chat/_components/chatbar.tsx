import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Bot, Dot } from "lucide-react";
import ChatSearch from "./chat-search";
import { AddMember } from "./add-member";

const usersData = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    isBot: false
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    isBot: false
  },
  {
    id: 3,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    isBot: false
  },
  {
    id: 4,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    isBot: false
  },
  {
    id: 5,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    isBot: false
  },
  {
    id: 6,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    isBot: true
  },
  {
    id: 7,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    isBot: true
  },
];

const Chatbar = () => {
  return (
    <div className="flex flex-col h-full w-[22rem] overflow-auto border-r-[1px] border-border py-[10px] px-2 space-y-2">
      <ChatSearch />
      <AddMember />
      <div className="flex flex-col space-y-2">
        {usersData.map((user) => (
          <Link href={`/app/chat/${user.id}`} key={user.id}>
            <div
              key={user.id}
              className="flex items-center space-x-2 h-16 px-2 rounded-lg cursor-pointer hover:bg-muted relative"
            >
              <Avatar>
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm flex gap-0 items-center font-semibold">
                  {user.name}
                  {user.isBot && (
                    <Bot size={16} className="text-gray-500 ml-1" />
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  {user.last_message}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {user.last_message_at}
                </span>
              </div>
              {
                user.status === "online" && (
                  <div className="absolute top-1 right-2">
                    <Dot color="green" />
                  </div>
                )
              }
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chatbar;
