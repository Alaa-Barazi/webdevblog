"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { success } from "zod";
import {
  generateEmailVerificationToken,
  sendEmailVerificationEmailToken,
} from "@/lib/emailVerification";

export const signUp = async (values: RegisterSchemaType) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid field" };
  }

  const { name, email, password } = validateFields.data;
  const user = await getUserByEmail(email);
  if (user) {
    return { error: "Email already in use" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const emailVerificationToken = await generateEmailVerificationToken(email);
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
};
