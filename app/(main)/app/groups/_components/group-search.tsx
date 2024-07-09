"use client";

import { searchGroups } from "@/actions/group";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// TODO: Make this a controlled input and working with the searchGroups function
const ChatSearch = () => {
    const [value, setValue] = useState<string>("");
    const [groups, setGroups] = useState<any[]>([]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);

        if (e.target.value.length > 2) {
            const { groups } = await searchGroups(e.target.value);

            if(!groups) return;

            setGroups(groups);
        }
    }

    const handleRemove = () => {
        setValue("");
        setGroups([]);
    }

    return ( 
        <div className="relative w-full">
            <Input
                placeholder="Search groups"
                onChange={handleSearch}
            />
            {/* TODO: Add a close button */}
            <div className="absolute top-0 right-0">
                <button onClick={handleRemove} className="p-2">
                    X
                </button>
            </div>
        </div>
     );
}
 
export default ChatSearch;