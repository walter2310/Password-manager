import { Response } from "express";
import { RequestWithUser } from "../middlewares/validateJWT";
import User from "../models/userModel";

export const uploadFileToDB = async (req: RequestWithUser, res: Response) => {
    try {
        const { id } = req.params;
        const userData = await User.findByIdAndUpdate(id, {
            img: req.file?.path
        }, { returnOriginal: false });

        res.status(200).json({ status: 'ok', data: userData });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'Failed',
            error: 'Could not upload the img'
        });
    };
}