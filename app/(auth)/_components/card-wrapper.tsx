"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "./header";
import SocialAuth from "./social-auth";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonText: string;
  backButtonHref: string;
  btnType: "login" | "register";
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonText,
  btnType,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-md w-[720px] sm:rounded-lg my-30">
      <CardHeader>
        <div className="sm:mx-auto sm:w-full">
          <div className="h-12 w-12 mx-auto bg-rose-500 rounded-full" />
          <Header label={headerLabel} />
          <p className="mt-2 text-center text-md text-gray-600 max-w">
            HeyMate is the best place to hangout with friends and family.
            <br />A platform where you can express yourself without any
            restrictions.
          </p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col items-center">
        <SocialAuth />
        <BackButton href={backButtonHref} text={backButtonText} btnType={btnType} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
