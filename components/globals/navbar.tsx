import { auth, signOut } from "@/auth";
import { GoalIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="flex justify-between items-center h-20 px-10 py-2">
      <div className="flex items-center space-x-2">
        <GoalIcon size={32} />
        <h1 className="text-xl font-semibold">
          <span className="text-blue-500">Hey</span>Mate
        </h1>
      </div>
      <div className="flex space-x-4">
        <Link href="/">
            <span className="text-lg hover:text-blue-400">
                Home
            </span>
        </Link>
        <Link href="/about">
            <span className="text-lg hover:text-blue-400">
                Features
            </span>
        </Link>
      </div>
      <div>
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/auth/login",
              });
            }}
          >
            <Button type="submit" className="rounded-full px-4 py-2 h-12 w-28 bg-blue-600 text-white hover:bg-blue-700">
                Sign out
            </Button>
          </form>
        ) : (
          <Link href="/auth/login">
            <Button className="rounded-full px-4 py-2 h-12 w-28 bg-blue-600 text-white hover:bg-blue-700">
                Sign in
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
