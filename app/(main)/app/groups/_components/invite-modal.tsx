"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Copy, RefreshCcw } from "lucide-react";

interface InviteModalProps {
  inviteCode: string;
}

const InviteModal = (
  { inviteCode }: InviteModalProps
) => {

  const { toast } = useToast();
  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/app/groups/invite/${inviteCode}`);
    toast({
      title: "Link copied!",
      description: "Invite link copied to clipboard",
    })
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
          Invite Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Invite Friends</DialogTitle>
          <DialogDescription>Invite friends to your group</DialogDescription>
        </DialogHeader>
        <Label className="w-full">
            Invite Dialog
        </Label>
        {/* TODO: Add invite dialog, copy link, and refresh link */}
        <div className="flex items-center mt-2 space-x-2">
            <Input
                className="bg-muted border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-secondary-foreground"
                value={`${process.env.NEXT_PUBLIC_URL}/app/groups/invite/${inviteCode}`}
                readOnly
            />
            <Button size="icon" variant="ghost" onClick={copyLink}>
                <Copy className="h-4 w-4" />
            </Button>
            {/*  TODO: Add refresh link */}
            {/* <Button size="icon" variant="ghost">
                <RefreshCcw className="h-4 w-4" />
            </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
