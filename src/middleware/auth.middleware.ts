import { Request, Response, NextFunction } from "express"; 
import { verifyToken } from "../modules/utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined; 
  let authHeader = req.headers.authorization || req.headers.Authorization; 
  if (Array.isArray(authHeader)) authHeader = authHeader[0]; 
  if (typeof authHeader === "string") {
    token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  } 
  if (!token && req.headers["x-access-token"]) {
    const xToken = req.headers["x-access-token"];
    token = Array.isArray(xToken) ? xToken[0] : xToken;
  } 
  if (!token && req.query.token) {
    token = req.query.token as string;
  } 
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  } 
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET || "");
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


 
export const ownerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user || user.role !== "OWNER") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};