"use client";

import CardWrapper from "./card-wrapper";
import { DotLoader } from "react-spinners";
import { FormError } from "./error";
import { FormSuccess } from "./success";

import { verification } from "@/actions/verify-email";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VerficationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {

        if (success || error) return;

        if (!token) {
            setError("No token provided");
            return;
        }

        verification(token)
            .then((data) => {
                if(data.success){
                    setSuccess(data.success)
                    return;
                }
                if(data.error){
                    setError(data.error)
                    return;
                }
            })
            .catch(() => {
                setError("An error occurred while verifying your email");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    
    return ( 
        <CardWrapper
            headerLabel="Verify your email"
            backButtonText="Back to login"
            backButtonHref="/auth/login"
            btnType="none"
        >
            <div className="flex items-center w-full justify-center flex-col gap-2">
                {
                    !error && !success && (
                        <DotLoader color="#ddd" size={50} />
                    )
                }
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
     );
}
 
export default VerficationForm;