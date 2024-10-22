"use client";

import { messageSchema } from "@/app/schemas";
import FileUpload from "@/components/globals/file-upload";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SendGroupMessageProps {
    groupId: string;
}

const SendGroupMessage = (
    {groupId} : SendGroupMessageProps
) => {
    
    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: "",
            fileUrl: "",
            type: "group",
            id: groupId
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        try {
            if(isLoading) {
                return;
            }
            await axios.post("/api/messages", data);
            form.reset();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center px-4 pb-4 w-full bg-transparent" autoComplete="off">
            {/* <FormField
            control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormControl>
                      <FileUpload
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                        <FormItem className="flex-1 h-12">
                            <Input {...field} placeholder="Type a message..." className="w-full h-full" />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
 
export default SendGroupMessage;