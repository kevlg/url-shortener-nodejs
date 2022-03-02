import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (user: string, password: string) => {
    if (user === 'admin' && password === '1234') {
        return jwt.sign({user}, process.env.TOKEN_SECRET || "", { expiresIn: '1800s' });
    }

    return "";
}

export const login = (req: Request, res: Response) => {
    const { user, password } = req.body;
	
    const token = generateToken(user, password);
	
    if (token.length > 1) {
        res.json({
            token
        });
    }

    res.sendStatus(400);
};