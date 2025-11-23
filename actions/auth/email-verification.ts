"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { success } from "zod";

export const verifyEmail = async (token: string) => {
  const emailVerificationToken = await db.emailVerificationToken.findUnique({
    where: { token },
  });
  if (!emailVerificationToken)
    return { error: "Verification email does not exist!" };

  const isExpired = new Date(emailVerificationToken.expires) < new Date();
  if (isExpired) return { error: "Verification token expired!" };

  const exisitingUser = await getUserByEmail(emailVerificationToken.email);

  if (!exisitingUser) return { error: "user does not exist!" };

  await db.user.update({
    where: { id: exisitingUser.id },
    data: { emailVerified: new Date(), email: emailVerificationToken.email },
  });

  return {success:"Email verified!"}
};
