import { UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const Profile = () => {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
                <UserCircle />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} side="right">
        <DropdownMenuItem>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
  );
};
