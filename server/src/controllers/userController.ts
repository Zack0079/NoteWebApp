import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import config from '../config/config.js';

type loginRequestBody = {
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  try {
    const loginBody: loginRequestBody = await req.body;
    // console.log("body:",loginBody);
    const invalidData: string = "The email/password is invalid"


    if (!loginBody.email || !loginBody.password) {
      return res.status(400).json({ message: invalidData });
    }

    const user = await User.findOne({ email: loginBody.email });

    if (!user) {
      return res.status(404).json({ message: invalidData });
    }

    const isMatch = await user.comparePassword(loginBody.password);
    if (!isMatch) {
      return res.status(401).json({ message: invalidData });
    }


    const token = jwt.sign(
      { id: user._id },
      config.jwtSecret,
      { expiresIn: '1h' }
    );


    res.json({
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Invalid User ID' });
  }
};