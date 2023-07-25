import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

export interface RequestWithUser extends Request {
    user?: IUser | null;
}

export const validateJWT = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            status: 'FAILED',
            data: {
                error: 'You do not have any token',
            }
        });
    };

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - user do not exists in DB'
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(403)
    }
}
