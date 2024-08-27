import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ data: {}, message: "Token inválido", error: true });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET ?? '');

    req.body.username = decodedToken.username;
    req.body.user_id = decodedToken.user_id;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno", error: true });
  }
};
