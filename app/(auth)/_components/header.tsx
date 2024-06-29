import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

interface HeaderProps {
    label: string;
}

export const Header = ({label}: HeaderProps) => {
    return (
        <div className={cn("flex flex-col items-center", font.className)}>
            <p className="text-gray-500 text-2xl">{label}</p>
        </div>
    );
}