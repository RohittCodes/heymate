"use client";

import { ArrowUpRight, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

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
          <Link href="/app/profile">
            <DropdownMenuItem className="cursor-pointer">
            {user?.email} <ArrowUpRight />
            </DropdownMenuItem>
          </Link>
        <DropdownMenuItem onClick={handleSignOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
  );
};
