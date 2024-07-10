import { getAllBots } from "@/actions/bots";
import { DirectBots } from "./_components/carousel";
import { getFriendsByUserId } from "@/actions/friends";
import { auth } from "@/auth";
import GroupBots from "./_components/group-bots";
import { getGroupOwnedAndModerated } from "@/actions/group";

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

    const groups = await getGroupOwnedAndModerated(userId, bots);

    if(!groups) {
        return {
            error: "No groups found!"
        }
    }

    // console.log(groups)
    // console.log(friends)

    return ( 
        <div className="flex flex-col h-full gap-4 mx-4 w-full py-4">
            <div className="text-2xl font-semibold">
                Welcome to HeyMate!
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-[10px]">
                    <span className="ml-2 text-xl font-semibold mb-4">
                        Bots you can use:
                    </span>
                    <DirectBots bots={bots} friends={friends} />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <span className="ml-2 text-xl font-semibold mb-4">
                        Bots to add to your groups:
                    </span>
                    <GroupBots bots={bots} groups={groups} />
                </div>
            </div>
        </div>
     );
}
 
export default AppPage;