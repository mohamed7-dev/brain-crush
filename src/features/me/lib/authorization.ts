import "server-only";

import { HttpException } from "@/lib/exceptions";
import { auth, currentUser } from "@clerk/nextjs/server";
import { checkIsTeacher } from "./utils";

export async function ownerOnly(ownerId: string, message?: string) {
  const authObject = await auth();
  if (authObject.userId !== ownerId) {
    throw HttpException.Forbidden(message ?? "Forbidden Action");
  }
  return authObject;
}

export async function userOnly(message?: string) {
  const authObject = await auth();
  if (!authObject || !authObject.userId) {
    throw HttpException.Unauthorized(message ?? "Unauthorized");
  }
  const user = await currentUser();
  return { ...authObject, user };
}

export async function teacherOnly(message?: string) {
  const authObject = await userOnly(message);
  if (!authObject.userId || !checkIsTeacher(authObject.userId)) {
    throw HttpException.Forbidden(
      message ?? "Forbidden: only teachers are authorized."
    );
  }
  return authObject;
}
