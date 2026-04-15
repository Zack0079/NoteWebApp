import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import config from '../config/config.js';
import { ref } from 'node:process';

type loginRequestBody = {
  email: string;
  password: string;
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'prod',
  sameSite: 'lax' as const,
};

const accessTokenExpiry = config.accessTokenExpiry;
const refreshTokenExpiry = config.refreshTokenExpiry;
const updateRefreshTokenLimit = config.updateRefreshTokenLimit;

const login = async (req: Request, res: Response) => {
  try {
    const loginBody: loginRequestBody = await req.body;
    // console.log("body:",loginBody);
    const invalidData: string = 'The email/password is invalid';


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


    const accessToken = jwt.sign({ id: user._id }, config.accessSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, config.refreshSecret, { expiresIn: '2h' });

    await RefreshToken.create({ token: refreshToken, userId: user._id, expiresAt: new Date(Date.now() + refreshTokenExpiry * 1000) });

    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: refreshTokenExpiry * 1000 });
    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: accessTokenExpiry * 1000 });

    res.json({
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


const userLoginAuthCheck = async (req: Request, res: Response) => {

  const oneHourInMs: number = 60 * 60 * 1000;

  const incomingAccessToken = req.cookies.accessToken;
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken || !incomingAccessToken) return res.status(401).json({ message: 'Not authenticated' });

  var userData;
  try {
    // 1. Check if Access Token is valid (even if expired, we can get user ID from it)
    const accessPayload = jwt.verify(incomingAccessToken, config.accessSecret, { ignoreExpiration: true }) as { id: string, exp: number };

    if (!!accessPayload.id && accessPayload.exp * 1000 > Date.now()) {
      userData = await User.findOne({ _id: accessPayload.id }).select('username email _id').lean();

    }
    //2. If Access Token is expired, check Refresh Token & get user ID from there
    else if (!!accessPayload.id || !!incomingRefreshToken) {

      const saveToken = await RefreshToken.findOne({ token: incomingRefreshToken }).lean();
      if (!saveToken) throw new Error("Invalid refresh token");

      //3. check Refresh Token is valid
      const refreshPayload = jwt.verify(incomingRefreshToken, config.refreshSecret) as { id: string };
      if (!refreshPayload.id) throw new Error("Invalid refresh token");

      // 4. generate new Access Token and send to client
      const newAccessToken = jwt.sign({ id: refreshPayload.id }, config.accessSecret, { expiresIn: '1h' });
      res.cookie('accessToken', newAccessToken, { ...cookieOptions, maxAge: accessTokenExpiry * 1000 });

      // 5. check refesh token is less than 1 hour to expire and generater new refresh token if so
      if (new Date(saveToken.expiresAt).getTime() < Date.now() + oneHourInMs) {
        const newRefreshToken = jwt.sign({ id: refreshPayload.id }, config.refreshSecret, { expiresIn: '2h' });
        await RefreshToken.deleteOne({ _id: saveToken._id });
        await RefreshToken.create({ token: newRefreshToken, userId: refreshPayload.id, expiresAt: new Date(Date.now() + refreshTokenExpiry * 1000) });
        res.cookie('refreshToken', newRefreshToken, { ...cookieOptions, maxAge: refreshTokenExpiry * 1000 });
      }

      // 6. get user details and send to client
      userData = await User.findOne({ _id: refreshPayload.id }).select('username email _id').lean();

    } else {
      throw new Error("Invalid access token");
    }

    // 7. send user details to client, if not found, throw error
    if (!userData) throw new Error("User not found");
    return res.json({
      user: {
        id: userData._id,
        username: userData.name,
        email: userData.email,
      }
    });


  } catch (error) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

};



export default {
  login,
  userLoginAuthCheck
}

