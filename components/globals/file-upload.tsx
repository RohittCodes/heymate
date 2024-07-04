"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface FileUploadProps {
    onChange: (url?: string) => void;        
    value: string | undefined;
    endpoint: "groupImage" | "userImage" | "messageFile";
}

const FileUpload = (
    {onChange, value, endpoint}: FileUploadProps
) => {

    const fileType = value?.split(".").pop();

    if(value && fileType!== "pdf") {
        return (
            <div className="relative h-24 w-24 border-border rounded-md overflow-hidden border-[2px]">
                <Image
                    fill
                    sizes="100%"
                    src={value}
                    alt="Uploaded file preview"
                    className="rounded-md h-full w-full"
                />
                <Button
                    onClick={() => onChange()}
                    className="absolute top-1 right-1 h-4 w-4 rounded-full flex items-center justify-center"
                    variant="destructive"
                    size="icon"
                >
                    <X size={24} />
                </Button>
            </div>
        );
    }

    if(endpoint === "messageFile") {
        return (
            <UploadButton   
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0]?.url);
                }}
                onUploadError={(error: Error) => {
                    console.error(error);
                }}
            />
        );
    }

    return ( 
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0]?.url);
            }}
            onUploadError={(error: Error) => {
                console.error(error);
            }}
        />
    );
}
 
export default FileUpload;