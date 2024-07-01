import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatSearch from "./group-search";
import Link from "next/link";
import { CreateGroup } from "./create-group";
import { Bot, Dot } from "lucide-react";
import { getGroupById, getGroupByUserId } from "@/data/group";
import { auth } from "@/auth";

const GroupSidebar = async () => {

  const session = await auth();
  const userId = session?.user?.id as string;

  const groups = await getGroupByUserId(userId);

  return (
    <div className="flex flex-col h-full w-72 overflow-auto border-r-[1px] border-border py-[10px] px-2 space-y-2">
      <ChatSearch />
      <CreateGroup />
      <div className="flex flex-col space-y-2">
        {groups.map((group) => (
            <Link href={`/app/groups/${group.id}`} key={group.id}>
              <div
                key={group.id}
                className="flex items-center space-x-2 h-16 px-2 rounded-lg cursor-pointer hover:bg-muted relative"
              >
              <Avatar>
                <AvatarImage src={group.imageUrl} alt={group.name} />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm flex gap-0 items-center font-semibold">
                  {group.name}
                </span>
                <span className="text-xs text-gray-500">
                  {/* {group.last_message} */}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {/* {group.last_message_at} */}
                </span>
              </div>
              {/* {
                group.status === "online" && (
                  <div className="absolute top-1 right-2">
                    <Dot color="green" />
                  </div>
                )
              } */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupSidebar;
