"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useTransition } from "react";
import { z } from "zod";
import { addMember } from "@/actions/friends";
import { useRouter } from "next/navigation";
import { addBotSchema, addMemberSchema } from "@/app/schemas";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { addBotToGroup, getGroupOwnedAndModerated } from "@/actions/group";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CarouselSizeProps {
  bots: any;
  groups: any;
}

// TODO: Fix it so that the groups which the bot is already a member of are not shown

const GroupBots = ({ bots, groups }: CarouselSizeProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  console.log(groups);

  const onSubmit = (values: z.infer<typeof addBotSchema>) => {
    try {
        console.log(values);
        addBotToGroup(values);
        router.refresh();
        window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(groups);

  return (
    <div className="h-full w-full">
      <Carousel className="w-full h-full" orientation="horizontal">
        <CarouselContent className="-ml-1">
          {bots.map((bot: any) => (
            <CarouselItem
              key={bot.id}
              className="pl-2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="w-full h-full">
                <CardHeader className="pb-2 px-6 pt-6 h-44">
                  <Image
                    src={bot.image}
                    alt={bot.username}
                    height={128}
                    width={128}
                    className="w-full h-full object-cover rounded-md"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">
                    {bot.username.toUpperCase()}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm font-normal">{bot.description}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      sideOffset={10}
                      align="start"
                      className="flex flex-col gap-1"
                    >
                      {groups.length > 0 && (
                          groups.map((group: any) => (
                          <Button
                            variant="ghost"
                            className="w-full"
                            key={group.id}
                            onClick={() => {
                              startTransition(() => {
                                onSubmit({ userId: bot.id, groupId: group.id });
                              });
                            }}
                          >
                            {group.name}
                          </Button>
                        ))
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-10 w-10 -top-4" />
        <CarouselNext className="h-10 w-10 -top-4" />
      </Carousel>
    </div>
  );
};

export default GroupBots;
