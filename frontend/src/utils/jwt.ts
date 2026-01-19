import jwt from "jsonwebtoken";

export function gerarToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
}
