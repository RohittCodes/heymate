"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";

interface MessageBoxProps {
    message: any;
}

const MessageBox = (
    {message} : MessageBoxProps
) => {

    const currentUser = useCurrentUser();

    // TODO: implement lazy loading for this component
    
    const content = message?.content;
    const user = message?.member?.user;

    console.log(user);
    return ( 
        <div className={`flex space-x-2 py-2 ${currentUser?.id === user?.id ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-center space-x-2 ${currentUser?.id === user?.id ? "flex-row-reverse" : "flex-row"}`}>
                <Image 
                    src={user?.image}
                    alt="User Image"
                    width={40}
                    height={40}
                    className={`rounded-full ${currentUser?.id === user?.id ? "order-2" : "order-1"} ${currentUser?.id === user?.id ? "ml-2" : "mr-2"}`}
                />
            </div>
            <div>
                <div className="flex items-center space-x-2">
                    <div className="font-semibold">
                        {user?.username}
                    </div>
                    <div className="text-xs text-gray-500">
                        {/* {message.createdAt} */}
                    </div>
                </div>
                <div>
                    {content}
                </div>
            </div>
        </div>
     );
}
 
export default MessageBox;