const ChatPage = (
    {params}: {params: {chat: string}}
) => {
    return ( 
        <div>
            {params.chat}
        </div>
     );
}
 
export default ChatPage;