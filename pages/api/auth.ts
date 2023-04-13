// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = req.cookies.user_session;
  if (!session) return res.status(200).json(null);
  const jwtKey = process.env.JWT_SECRET;
  if (!jwtKey) return res.status(401).json("JWT Key must be set");

  try {
    const decoded = jwt.verify(session, jwtKey);
    return res.status(200).json(decoded);
  } catch (err) {
    return res.status(401).json("Unauthorized");
  }
}
