"use client";

import { Profile } from "@/components/globals/profile";
import { ThemeToggle } from "@/components/globals/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoalIcon, IceCream, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {

    const navigation = usePathname();

    console.log(navigation);

    return (
        <div className="h-full w-16 flex flex-col items-center justify-between border-border border-r-[1px] py-2 gap-2">
            <div className="px-2 py-2">
                <GoalIcon />   
            </div>
            <Separator className="w-3/4" />
            <div className="h-full flex flex-col items-center justify-between">
                <Button variant="outline" size="icon">
                    <IceCream />
                </Button>
                <div className="flex flex-col gap-2">
                <Separator className="w-full" />
                    <ThemeToggle />
                    <Profile />
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;