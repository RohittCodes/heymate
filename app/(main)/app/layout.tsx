import Sidebar from "../_components/sidebar"
import Chatbar from "./_components/chatbar";

const AppLayout = (
    {children} : {children: React.ReactNode}
) => {
    return (
        <div className="h-full w-full flex">
            <Sidebar />
            <Chatbar />
            <div className="my-1 mx-2">
                {children}
            </div>
        </div>
    )
}

export default AppLayout;