import { db } from "./db";

export const getUserByEmail = async (email: String) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};
