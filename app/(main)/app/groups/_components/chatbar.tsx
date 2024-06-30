import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatSearch from "./group-search";
import Link from "next/link";
import { CreateGroup } from "./create-group";
import { Bot, Dot } from "lucide-react";

const groupsData = [
  {
    id: 1,
    name: "Group 1",
    avatar_url: "",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    last_message_by: "John Doe",
    status: "online",
    isCommunity: false,
  },
  {
    id: 2,
    name: "Group 2",
    avatar_url: "",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    last_message_by: "Jane Doe",
    status: "online",
    isCommunity: false,
  },
  {
    id: 3,
    name: "Group 3",
    avatar_url: "",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    last_message_by: "John Doe",
    status: "offline",
    isCommunity: true,
  },
  {
    id: 4,
    name: "Group 4",
    avatar_url: "",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    last_message_by: "Jane Doe",
    status: "online",
    isCommunity: false,
  },
  {
    id: 5,
    name: "Group 5",
    avatar_url: "",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    last_message_by: "John Doe",
    status: "online",
    isCommunity: false,
  },
  {
    id: 6,
    name: "Group 6",
    avatar_url: "",
    last_message: "Hello, how are you?",
    last_message_at: "07:00 PM",
    last_message_by: "Jane Doe",
    status: "offline",
    isCommunity: false,
  },
]

const GroupSidebar = () => {
  return (
    <div className="flex flex-col h-full w-72 overflow-auto border-r-[1px] border-border py-[10px] px-2 space-y-2">
      <ChatSearch />
      <CreateGroup />
      <div className="flex flex-col space-y-2">
        {groupsData.map((group) => (
          <Link href={`/app/groups/${group.id}`} key={group.id}>
            <div
              key={group.id}
              className="flex items-center space-x-2 h-16 px-2 rounded-lg cursor-pointer hover:bg-muted relative"
            >
              <Avatar>
                <AvatarImage src={group.avatar_url} alt={group.name} />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm flex gap-0 items-center font-semibold">
                  {group.name}
                  {group.isCommunity && (
                    <Bot size={16} className="text-gray-500 ml-1" />
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  {group.last_message}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {group.last_message_at}
                </span>
              </div>
              {
                group.status === "online" && (
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

export default GroupSidebar;
