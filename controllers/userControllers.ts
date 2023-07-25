import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import generateToken from "../helpers/generateJWT";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    User.find({}).then(function (users) {
      res.status(200).json({ status: 'OK', data: users });
    });

  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: 'Could not get all users'
    })
  };
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, secretKey } = req.body;
    const user = new User({ name, email, password, secretKey });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    user.secretKey = bcrypt.hashSync(secretKey, salt);

    await user.save();
    res.status(200).json({ status: 'Ok', data: user });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Failed',
      error: 'Could not create the user'
    });
  };
};

export const getDataUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);

    res.status(200).json({ status: 'Ok', data: getUser });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Failed',
      error: 'Could not get the user'
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, secretKey } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ msg: 'The email do not exists in DB' })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    const validKey = bcrypt.compareSync(secretKey, user.secretKey);

    if (!validPassword) {
      return res.status(403).json({ msg: 'The email or the password is not correct' })
    };

    if (!validKey) {
      return res.status(403).json({ msg: 'The email or the password is not correct' })
    };

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    user.secretKey = bcrypt.hashSync(secretKey, salt);

    return res.status(200).json({ status: 'OK', token: generateToken(user._id) })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'FAILED',
      data: { error: 'Could not login' }
    });
  };
};


export const uploadUser = async (req: Request, res: Response) => {
  try {

  } catch (error) {

  };
};

export const removeUser = async (req: Request, res: Response) => {
  try {

  } catch (error) {

  };
};
