import { acceptGroupInvite } from "@/actions/create-group";
import { redirect } from "next/navigation";

const InvitePage = async (
    { params: { inviteUrl } } : { params: { inviteUrl: string } }
) => {

    console.log(inviteUrl);
    
    const {
        group,
        error
    } = await acceptGroupInvite(inviteUrl);

    if(!error){
        redirect(`/app/groups/${group?.id}`);
    }

    return (
        <div>
            {error}
        </div>
    );

}
 
export default InvitePage;