import Sidebar from "./_components/sidebar"

const AppLayout = (
    {children} : {children: React.ReactNode}
) => {
    return (
        <div className="h-full w-full flex">
            <Sidebar />
            <div className="h-full w-full">
                {children}
            </div>
        </div>
    )
}

export default AppLayout;