import GroupSidebar from "./_components/chatbar";

const ChatLayout = (
    {children} : {children: React.ReactNode}
) => {
    return ( 
        <div className="h-full w-full flex">
            <GroupSidebar />
            <div className="flex-1 h-full">
                {children}
            </div>
        </div>
     );
}
 
export default ChatLayout;