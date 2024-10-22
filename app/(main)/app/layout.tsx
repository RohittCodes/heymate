const AppLayout = (
    {children} : {children: React.ReactNode}
) => {
    return (
        <div className="h-full w-full flex">
            {children}
        </div>
    )
}

export default AppLayout;