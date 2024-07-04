import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import InviteModal from "../_components/invite-modal";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { getGroupById, isMemberOfGroup } from "@/data/group";
import { auth } from "@/auth";
import SendGroupMessage from "../_components/send-message";
import MessageView from "../_components/message-view";
import { getMessages } from "@/actions/group";

const ChatPage = async (
    {params : {group}} : {params: {group: string}}
) => {

    const session = await auth();
    const userId = session?.user?.id as string;

    const isMember = await isMemberOfGroup(userId, group);

    const messages = await getMessages({ id: group, type: "group" });

    if(!isMember) {
        return (
            <div>
                You are not a member of this group!
            </div>
        )
    }
    
    const groupInfo = await getGroupById(group);

    return ( 
        <div className="flex flex-col h-full justify-between">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
                <div className="text-lg font-semibold">
                    {groupInfo.name}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreVertical className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" sideOffset={10} align="start">
                        <InviteModal inviteCode={groupInfo.inviteCode} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <MessageView type="group" id={group} messages={messages.messages} />
            <SendGroupMessage groupId={group} />
        </div>
     );
}
 
export default ChatPage;