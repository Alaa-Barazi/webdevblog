"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { success } from "zod";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { signIn } from "@/auth";
import { LOGIN_REDIRECT } from "@/routes";
import { AuthError, CredentialsSignin } from "next-auth";
import { generateEmailVerificationToken, sendEmailVerificationEmailToken } from "@/lib/emailVerification";

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid field" };
  }

  const { email, password } = validateFields.data;
  const user = await getUserByEmail(email);
  if (!user || !email || !password || !user.password) {
    return { error: "Invalid credentials!" };
  }
  if (!user.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(user.email)

    const { error } = await sendEmailVerificationEmailToken(
        emailVerificationToken.email,
        emailVerificationToken.token
      );
      if (error) {
        return {
          error:
            "Something went wrong while sending email verification email! try to login to resend the verification email!",
        };
      }
      return { success: "Verification email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }
  }
};
