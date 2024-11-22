import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Access token required." });
    return; // Ensure the middleware doesn't proceed further
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Malformed token." });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY!);
    (req as any).user = user; // Attach user info to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};
