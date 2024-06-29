import { CheckCircleIcon } from "lucide-react";

interface FormSuccessProps {
    message?: string;    
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null;
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center text-emerald-500 gap-x-2 text-sm">
            <CheckCircleIcon size={16} />
            <span>{message}</span>
        </div>
    );
}