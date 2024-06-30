import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import InviteModal from "../_components/invite-modal";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const ChatPage = (
    {params}: {params: {group: string}}
) => {
    return ( 
        <div className="flex flex-col h-full justify-between">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
                <div className="text-lg font-semibold">
                    {params.group}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreVertical className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" sideOffset={10} align="start">
                        <InviteModal />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {params.group}
        </div>
     );
}
 
export default ChatPage;