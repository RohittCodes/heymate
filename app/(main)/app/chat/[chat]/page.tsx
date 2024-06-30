const ChatPage = (
    {params}: {params: {chat: string}}
) => {
    return ( 
        <div className="flex flex-col h-full justify-between">
            <div className="h-16 w-full border-b-[1px]">
                Navbar
            </div>
            {params.chat}
        </div>
     );
}
 
export default ChatPage;