import { db } from "@/lib/db";

export const getGroupById = async (id: string) => {
    return await db.group.findUniqueOrThrow({
        where: {
            id
        }
    });
};

export const getGroupByUserId = async (userId: string) => {
    return await db.group.findMany({
        where: {
            members: {
                some: {
                    userId
                }
            }
        }
    });
}

export const isMemberOfGroup = async (userId: string, groupId: string) => {
    return await db.group.findFirst({
        where: {
            id: groupId,
            members: {
                some: {
                    userId
                }
            }
        }
    });
}