import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const ProfilePage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  // TODO: Fix the UI of this page
  return (
    <main className="flex h-full flex-1 flex-col gap-4 bg-muted/10 p-4 md:gap-8 md:p-10">
        <div className="grid w-full gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-md text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="" className="font-semibold text-primary">
              General
            </Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>
                  Profile Name
                </CardTitle>
                <CardDescription>
                  Your profile name is the name that is displayed to other users. Note: It&apos;s not your username.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Profile Name" defaultValue={user.name || ""} />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>
                  Email Address
                </CardTitle>
                <CardDescription>
                  Your email address is used for notifications and password recovery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Email Address"
                    type="email"
                    defaultValue={user.email || ""}
                  />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        </main>
  );
};

export default ProfilePage;