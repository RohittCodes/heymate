import { Header } from "./header";
import BackButton from "./back-button";
import {
    Card,
    CardHeader,
    CardFooter
} from "@/components/ui/card";

const AuthError = () => {
    return ( 
        <Card className="w-full max-w-md">
            <CardHeader>
                <Header label="Oops! Something went wrong" />
            </CardHeader>
            <CardFooter>
                <BackButton btnType="login" href="/auth/login" text="Back to login page" />
            </CardFooter>
        </Card>
    );
}
 
export default AuthError;