import { verifyToken } from "../libs/jwt";
import { NextFunction, Request, Response } from "express";

export const authRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Authorization denied" });

  try {
    const user = await verifyToken(token);

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).send({ message: "Invalid token" });
  }
};
