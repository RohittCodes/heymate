import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
    const session = await auth();
    return ( <div>
        {JSON.stringify(session)}
        <form action={async () => {
            "use server";
            await signOut({
                redirectTo: "/auth/login"
            });
        }}>
            <Button type="submit">
                Sign out
            </Button>
        </form>
    </div> );
}
 
export default SettingsPage;