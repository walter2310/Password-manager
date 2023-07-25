import { Response, NextFunction } from "express";
import Password from "../models/passwordModel";
import bcrypt from 'bcryptjs';
import { RequestWithUser } from '../middlewares/validateJWT';

export const getPasswordsFromUser = async (req: RequestWithUser, res: Response) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        msg: 'Token not valid - user not authenticated'
      });
    }

    Password.find({ user: req.user.id }).then(function (passwords) {
      res.status(200).json({ status: 'OK', data: passwords });
    });

  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: 'Could not get all passwords from user'
    });
  };
};


export const createPassword = async (req: RequestWithUser, res: Response) => {
  try {
    let { serviceName, password } = req.body;
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    
    for(let i = 0; i <= 8; i++) {
      let char =  Math.floor(Math.random() * str.length + 1);
      
      password += str.charAt(char);
    }
    
    const newPassword = new Password({ serviceName, password });

    if (!req.user) {
      return res.status(401).json({
        msg: 'Token not valid - user not authenticated'
      });
    }

    newPassword.user = req.user.id;

    await newPassword.save();
    res.status(200).json({ status: 'Ok', data: newPassword });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Failed',
      error: 'Could not create the password'
    });
  };
};

export const updatePassword = async (req: RequestWithUser, res: Response) => {
  try {

    const { id } = req.params;

    const { ...rest } = req.body;
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(rest.password, salt);

    const passwordToUpdate = await Password.findByIdAndUpdate(id, rest, {
      returnOriginal: false
    });

    res.status(200).json({ status: 'Ok', data: passwordToUpdate });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Failed',
      error: 'Could not update the password'
    });
  };
};

export const deletePassword = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params;
    await Password.findByIdAndDelete(id);

    res.status(200).json({ status: 'Password removed' });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Failed',
      error: 'Could not delete the password'
    });
  };
};

export const getPassword = async (req: RequestWithUser, res: Response) => {
  try {
    const { serviceName } = req.params;
    const { secretKey } = req.body;

    if (!req.user) {
      return res.status(401).json({
        msg: 'Token not valid - user not authenticated'
      });
    }

    const isMatch = await bcrypt.compare(secretKey, req.user.secretKey);
    if (!isMatch) {
      return res.status(401).json({
        msg: 'Invalid secret key'
      });
    }

    const password = await Password.findOne({ serviceName, user: req.user.id });

    if (!password) {
      return res.status(404).json({
        msg: 'Password not found'
      });
    }

    res.status(200).json({ status: 'OK', data: password.password });

  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: 'Could not get password'
    });
  }
};