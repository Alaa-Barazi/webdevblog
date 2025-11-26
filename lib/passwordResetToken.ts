import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwrodResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwrodResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exisitingToken = await getPasswordResetTokenByEmail(email);

  if (exisitingToken) {
    await db.passwrodResetToken.delete({
      where: { id: exisitingToken.id },
    });
  }

  const passwordResetToken = await db.passwrodResetToken.create({
    data: { email, token, expires },
  });
  return passwordResetToken;
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  //link that will be sent to email
  const resetLink = `${process.env.BASE_URL}/password-reset-form?token=${token}`;

  const res =  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset Link🎉",
    html: `<p>Click <a href=${resetLink}>here</a> to reset yout password</p>`,
  });
  return {error : res.error}
};
