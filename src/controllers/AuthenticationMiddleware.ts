import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  	const nonSecurePaths = ['/login'];
    
    if (nonSecurePaths.includes(req.path)) {
      	return next();
    }
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || "";
  
    jwt.verify(token, process.env.TOKEN_SECRET || "", (error: any, user: any) => {
      	if (error) {
			return res.sendStatus(403);
		}
      	next();
    });
  }