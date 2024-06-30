import Chatbar from "./_components/chatbar";

const ChatLayout = (
    {children} : {children: React.ReactNode}
) => {
    return ( 
        <div className="h-full w-full flex">
            <Chatbar />
            <div className="h-full w-full">
                {children}
            </div>
        </div>
     );
}
 
export default ChatLayout;