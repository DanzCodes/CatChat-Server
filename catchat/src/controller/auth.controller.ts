import bcrypt from "bcrypt";
import { users } from "../const/users";
import User, { IDeviceModel } from "../models/user.model";
import { Request, Response } from "express";
import { createToken } from "../libs/jwt";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  rememberme: boolean;
}

export interface IRegisterMetadata extends IRegisterForm {
  device: IDeviceModel;
}

export const login = async (req: Request, res: Response) => {
  const { email, password, rememberme } = req.body;

  //get ip, connection time and another data;

  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(403).send({ message: "This account doesn't exist" });

    const isMatch = await bcrypt.compare(password, user.password);
  
    if(!isMatch) return res.status(403).send({ message: "Invalid credentials" });

    const token = await createToken({ id: user._id }, rememberme);
    res.cookie("token", token);
    res.status(200).send({
      message: "Login successfully",
      data: {
        isAuth: true,
        user: {
          id: user._id,
          token: token,
          avatar: "",
          username: user.username,
          nickname: user.nickname,
          chatHistory: [],
        },
      },
    })
  }
  catch(err) { console.error(err) }
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password, device, rememberme } =
    req.body as IRegisterMetadata;

  try {
    const userUsername = await User.findOne({ username });
    if (userUsername)
      return res
        .status(400)
        .send({ message: "There is already exist a user with that username" });

    const userEmail = await User.findOne({ email });
    if (userEmail)
      return res
        .status(400)
        .send({ message: "There is already exist a user with that email" });

    device.isLogued = true;
    device.isRegistred = true;

    const passwordHashed = await bcrypt.hash(password, 8);

    const user = new User({
      email,
      username,
      devices: [device],
      nickname: username,
      password: passwordHashed,
    });

    await user.save();
    const token = await createToken({ id: user._id }, rememberme);

    res.cookie("token", token);
    res.status(200).send({
      message: "User created sucessfully",
      data: {
        isAuth: true,
        user: {
          id: user._id,
          token: token,
          avatar: "",
          username: username,
          nickname: username,
          chatHistory: [],
        },
      },
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
