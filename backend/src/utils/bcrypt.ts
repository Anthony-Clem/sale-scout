import bcrypt from "bcryptjs";

export const hash = async (password: string) => bcrypt.hash(password, 10);

export const compare = async (
  candidatePassword: string,
  hashedPassword: string
) => bcrypt.compare(candidatePassword, hashedPassword);
