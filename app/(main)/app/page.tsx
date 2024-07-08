import { getAllBots } from "@/actions/bots";
import { CarouselSize } from "./_components/carousel";
import { getFriendsByUserId } from "@/actions/friends";
import { auth } from "@/auth";

const AppPage = async () => {

    const bots = await getAllBots();
    const session = await auth();
    const userId = session?.user?.id;
    
    if(!userId) {
        return {
            error: "User not found!"
        }
    }
    
    const friends = await getFriendsByUserId(userId);

    if(!friends) {
        return {
            error: "No friends found!"
        }
    }

    console.log(friends)

    return ( 
        <div className="flex flex-col h-full gap-4 mx-4 w-full py-4">
            <div className="text-2xl font-semibold">
                Welcome to HeyMate!
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold">
                    Bots you can use:
                </div>
                <CarouselSize bots={bots} friends={friends} />
            </div>
        </div>
     );
}
 
export default AppPage;