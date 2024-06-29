"use client";

import { Button } from "@/components/ui/button";
import {
    Github,
    LucideTwitter,
    LucideFacebook,
    CircleOff
} from "lucide-react"

const SocialAuth = () => {
  return <div className="flex items-center w-full gap-x-2">
    <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => console.log("Twitter")}
    >
        <LucideTwitter size={24} />
        <span className="ml-2">
            Twitter
        </span>
    </Button>
    <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => console.log("Github")}
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
        onClick={() => console.log("Facebook")}
    >
        <CircleOff size={24} />
        <span className="ml-2">
            Discord
        </span>
    </Button>
  </div>
};

export default SocialAuth;
