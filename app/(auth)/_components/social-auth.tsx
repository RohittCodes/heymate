"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
    Github,
    LucideTwitter,
    LucideFacebook,
    CircleOff
} from "lucide-react"
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const SocialAuth = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onClick = (provider: "google" | "github" | "twitter" ) => {
        signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
    };

  return <div className="flex items-center w-full gap-x-2">
    <Button
        size="lg"
        disabled
        className="w-full"
        variant="outline"
        onClick={() => onClick("twitter")}
    >
        <LucideTwitter size={24} />
        {/* strike-through the following line */}
        <span className="ml-2">
            Twitter
        </span>
    </Button>
    <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
    >
        <Github size={24} />
        <span className="ml-2">
            Github
        </span>
    </Button>
    <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
    >
        <CircleOff size={24} />
        <span className="ml-2">
            Google
        </span>
    </Button>
  </div>
};

export default SocialAuth;
