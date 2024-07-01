import { auth } from "@/auth";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return { userId: session.user.id };
};

export const ourFileRouter = {
  groupImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete((file) => {
      console.log(file);
    }),

  userImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete((file) => {
      console.log(file);
    }),
    
  messageFile: f(["image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete((file) => {
      // Do something with the file
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
