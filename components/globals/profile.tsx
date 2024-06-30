"use client";

import { UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Profile = () => {

  const user = useCurrentUser();

  const handleSignOut = () => {
    signOut();
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
                <UserCircle />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} side="right">
        <DropdownMenuItem>
          {user?.email}
        </DropdownMenuItem>
        <DropdownMenuItem>
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
  );
};
