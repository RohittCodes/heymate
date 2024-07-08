"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import { useTransition } from "react";
import { z } from "zod";
import { addMember } from "@/actions/friends";
import { useRouter } from "next/navigation";
import { addMemberSchema } from "@/app/schemas";
import Link from "next/link";

interface CarouselSizeProps {
  bots: any,
  friends: any
}

export const CarouselSize = ({ bots, friends }: CarouselSizeProps) => {
  
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof addMemberSchema>) => {
    try{
      addMember(values);
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="h-full w-full">
       <Carousel className="w-full h-full" orientation="horizontal">
      <CarouselContent className="-ml-1">
        {bots.map((bot: any) => (
          <CarouselItem key={bot.id} className="pl-2 md:basis-1/3 lg:basis-1/4">
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
                <div className="text-lg font-semibold">{bot.username.toUpperCase()}</div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm font-normal">{bot.description}</div>
                {
                  friends.find((friend: any) => friend.requesteeId === bot.id) ? (
                    <Link href="/app/chat" passHref className="w-1/3">
                      <Button className="w-full">Chat</Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-1/3"
                      onClick={() => {
                        startTransition(() => {
                          onSubmit({ username: bot.username });
                        });
                      }}
                      disabled={isPending}
                    >
                      Add Friend
                    </Button>
                  )
                }
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-10 w-10 -top-4" />
      <CarouselNext className="h-10 w-10 -top-4" />
    </Carousel>
    </div>
  )
}
