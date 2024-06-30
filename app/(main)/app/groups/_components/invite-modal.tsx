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
import { Copy, RefreshCcw } from "lucide-react";

const InviteModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
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
                value="invite-link"
                readOnly
            />
            <Button size="icon">
                <Copy className="h-4 w-4" />
            </Button>
            <Button size="icon">
                <RefreshCcw className="h-4 w-4" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
