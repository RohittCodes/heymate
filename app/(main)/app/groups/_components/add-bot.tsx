import { Button } from "@/components/ui/button";
import Link from "next/link";

const AddBot = () => {
    return ( 
        <Link href="/app">
            <Button variant="ghost" className="w-full">
                Add Bot
            </Button>
        </Link>
     );
}
 
export default AddBot;