import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth as clerkAuth } from "@clerk/nextjs/server";
import { HttpException } from "@/lib/exceptions";

const f = createUploadthing();

const auth = async (req: Request) => {
  const { userId } = await clerkAuth();
  if (!userId) throw HttpException.Unauthorized();
  return { userId };
};

export const ourFileRouter = {
  courseCoverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => await auth(req))
    .onUploadComplete((file) => {
      console.log({ file: file.file });
    }),
  courseAttachments: f(["text", "image", "pdf", "video", "audio"])
    .middleware(async ({ req }) => await auth(req))
    .onUploadComplete((file) => {
      console.log({ file: file.file });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
export { UploadThingError } from "uploadthing/server";
