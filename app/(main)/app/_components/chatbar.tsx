import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatSearch from "./chat-search";
import Link from "next/link";
import { CreateGroup } from "./create-group";
import { Dot } from "lucide-react";

const usersData = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 3,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 4,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 5,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 6,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 7,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 8,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 9,
    name: "John Doe",
    username: "johndoe",
    avatar_url: "",
    status: "online",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
  {
    id: 10,
    name: "Jane Doe",
    username: "janedoe",
    avatar_url: "",
    status: "offline",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
  },
];

const Chatbar = () => {
  return (
    <div className="flex flex-col h-full w-72 overflow-auto border-r-[1px] border-border py-[10px] px-2 space-y-2">
      <ChatSearch />
      <CreateGroup />
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
