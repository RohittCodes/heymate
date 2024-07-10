"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { HeartHandshake, LeafyGreen } from "lucide-react";
import { useState } from "react";

interface SentimentProps {
  content: string;
  // optional groupId and friendId
  groupId?: string;
  friendId?: string;
  userId: string;
  messageId: string;
}

const sentimentToEmoji = {
  HAPPY: "😊",
  SAD: "😢",
  NEUTRAL: "😐",
  ANGRY: "😡",
  FEAR: "😨",
  DISGUST: "🤢",
  ANTICIPATION: "🤔",
  LOVE: "❤️",
  REMORSE: "😔",
};

const Sentiment = ({
  content,
  groupId,
  userId,
  messageId,
  friendId,
}: SentimentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState<string>("");

  const onSubmit = async () => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      const response = await axios.post("/api/sentiment", {
        content,
        messageId,
        groupId,
        userId,
        friendId,
      });
      const sentiment = response.data;
      setSentiment(sentiment);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full h-[24px] w-[24px]"
          onClick={onSubmit}
        >
          <HeartHandshake size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {isLoading ? <div>Loading...</div> : <div>{sentiment}</div>}
      </PopoverContent>
    </Popover>
  );
};

export default Sentiment;
