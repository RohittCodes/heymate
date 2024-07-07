"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";

import { addFriendSchema } from "@/app/schemas";

export const addMember = async (values: z.infer<typeof addFriendSchema>) => {
    const revalidatedFields = addFriendSchema.safeParse(values);

    // TODO: handle request to disable sending friend request to self

    if(!revalidatedFields.success) {
        return {
            error: "Invalid fields!"
        }
    }

    const session = await auth();

    const { username } = revalidatedFields.data;

    const requesteeId = await db.user.findUnique({
        where: {
            username
        }
    });

    if(!requesteeId) {
        return {
            error: "User not found!"
        }
    }
    
    const currentUser = session?.user as any;

    try{
        await db.friendship.create({
            data: {
                requesterId: currentUser.id,
                requesteeId: requesteeId.id
            },
        });

        return {
            success: "Friend added!"
        }
    } catch (error) {
        console.error(error);
    }
};

export const getFriendsByUserId = async (userId: string) => {
    return await db.friendship.findMany({
        where: {
            OR: [
                {
                    requesterId: userId
                },
                {
                    requesteeId: userId
                }
            ]
        },
        include: {
            requester: true,
            requestee: true,
            directMessages: true
        }
    });
}

export const getFriendshipById = async (id: string) => {
    return await db.friendship.findUnique({
        where: {
            id
        },
        include: {
            directMessages: {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    sender: true
                }
            },
            requester: true,
            requestee: true
        }
    });
}

// TODO: Implement the following functions with the appropriate logic and security measures
export const acceptFriendRequest = async (id: string) => {
    try {
        await db.friendship.update({
            where: {
                id
            },
            data: {
                status: "ACCEPTED"
            }
        });

        return {
            success: "Friend request accepted!"
        }
    } catch (error) {
        console.error(error);
    }
}

export const declineFriendRequest = async (id: string) => {
    try {
        await db.friendship.update({
            where: {
                id
            },
            data: {
                status: "REJECTED"
            }
        });

        return {
            success: "Friend request declined!"
        }
    } catch (error) {
        console.error(error);
    }
}

export const blockFriend = async (id: string) => {
    try {
        await db.friendship.update({
            where: {
                id
            },
            data: {
                status: "BLOCKED"
            }
        });

        return {
            success: "Friend blocked!"
        }
    } catch (error) {
        console.error(error);
    }
}

export const unblockFriend = async (id: string) => {
    const session = await auth();

    try {
        await db.friendship.update({
            where: {
                id
            },
            data: {
                status: "ACCEPTED"
            }
        });

        return {
            success: "Friend unblocked!"
        }
    } catch (error) {
        console.error(error);
    }
}