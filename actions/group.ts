"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

import { createGroupSchema } from "@/app/schemas";
import { auth } from "@/auth";

export const createGroup = async (values: z.infer<typeof createGroupSchema>) => {
    const revalidatedFields = createGroupSchema.safeParse(values);

    if(!revalidatedFields.success) {
        return {
            error: "Invalid fields!"
        }
    }

    const session = await auth();

    const { name, description, imageUrl } = revalidatedFields.data;
    // Generate invite code here
    const ownerId = session?.user?.id as string;
    const inviteCode = uuidv4();

    try {
        await db.group.create({
            data: {
                name,
                description,
                imageUrl,
                inviteCode,
                ownerId,
                members: {
                    create: {
                        userId: ownerId,
                        role: "OWNER",
                    }
                }
            }
        })
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to create group!"
        }
    }
    return;
};

export const acceptGroupInvite = async (inviteCode: string) => {
    const session = await auth();

    const userId = session?.user?.id as string;

    try {
        const group = await db.group.findFirst({
            where: {
                inviteCode
            }
        });

        if(!group) {
            return {
                error: "Invalid invite code!"
            }
        }

        const isMember = await db.group.findFirst({
            where: {
                id: group.id,
                members: {
                    some: {
                        userId
                    }
                }
            }
        });

        if(isMember) {
            return {
                error: "You are already a member of this group!"
            }
        }

        await db.group.update({
            where: {
                id: group.id
            },
            data: {
                members: {
                    create: {
                        userId,
                        role: "MEMBER"
                    }
                }
            }
        });

        return {
            success: "Joined group!",
            group
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to join group!"
        }
    }
}

interface GetMessagesProps {
    id: string;
    type: "group" | "direct";
}

export const getMessages = async ({ id, type }: GetMessagesProps) => {
    const session = await auth();

    const userId = session?.user?.id as string;

    try {
        const group = await db.group.findFirst({
            where: {
                id
            }
        });

        if(!group) {
            return {
                error: "Group not found!"
            }
        }

        const isMember = await db.group.findFirst({
            where: {
                id: group.id,
                members: {
                    some: {
                        userId
                    }
                }
            }
        });

        if(!isMember) {
            return {
                error: "You are not a member of this group!"
            }
        }

        const messages = await db.message.findMany({
            where: {
                groupId: id
            },
            include: {
                member: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                image: true
                            }
                        }
                    }
                }
            }
        });

        return {
            success: "Messages found!",
            messages
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to get messages!"
        }
    }
}