import { db } from "@/lib/db";

export const getAllBots = async () => {
    const bots = await db.user.findMany({
        where: {
            isBot: true
        }
    });

    if(!bots) {
        return {
            error: "No bots found!"
        }
    }

    return bots;
}