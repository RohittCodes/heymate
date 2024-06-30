"use client";

import { Profile } from "@/components/globals/profile";
import { ThemeToggle } from "@/components/globals/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoalIcon, HomeIcon, MessageCircleMore, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const navItems = [
    {
      icon: HomeIcon,
      title: "Home",
      href: "/app",
    },
    {
      icon: MessageCircleMore,
      title: "Chat",
      href: "/app/chat",
    },
    {
      icon: UsersIcon,
      title: "Groups",
      href: "/app/groups",
    },
  ];

  const navigation = usePathname();

  const isCurrentPath = (path: string) => {
    const currentPath = navigation.startsWith("/app") ? navigation : "/app";

    if (currentPath === path) {
      return true;
    }

    return false;
  }

  return (
    <div className="h-full w-16 flex flex-col items-center justify-between border-border border-r-[1px] py-2 gap-2">
      <div className="px-2 py-2">
        <GoalIcon />
      </div>
      <Separator className="w-3/4" />
      <div className="h-full flex flex-col items-center justify-between">
        <div className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <Button
                variant="outline"
                size="icon"
                className={`hover:bg-muted hover:text-indigo-500 ${
                  isCurrentPath(item.href) ? "bg-muted text-indigo-500" : ""
                }`}
              >
                <item.icon />
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Separator className="w-full" />
          <ThemeToggle />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
