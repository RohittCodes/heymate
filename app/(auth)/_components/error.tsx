import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
    message?: string;    
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;
    return (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center text-destructive gap-x-2 text-sm">
            <TriangleAlert size={16} />
            <span>{message}</span>
        </div>
    );
}