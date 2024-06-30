"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    href: string;
    text: string;
    btnType: "login" | "register" | "none";
}

const BackButton = (
    { href, text, btnType }: BackButtonProps
) => {
    return ( 
        <div className="flex w-full items-center mt-2">
            <p className="text-sm text-gray-600">
                {text}
            </p>
            <Link href={href} className="text-sm text-gray-600 hover:text-gray-800">
                    <Button
                        size="sm"
                        className="w-full px-1"
                        variant="link"
                    >
                        {btnType === "login" || btnType === "none" ? "Login" : "Register"}
                    </Button>
            </Link>
        </div>
    )
}
 
export default BackButton;