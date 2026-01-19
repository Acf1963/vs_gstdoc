import bcrypt from "bcryptjs";

export const hash = (txt: string) => bcrypt.hash(txt, 10);
export const compare = (txt: string, hashed: string) => bcrypt.compare(txt, hashed);
