import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res
        .status(400)
        .json({ message: "user with this email is already exist" });
    }

    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res.status(400).json({ message: "UserName is already exist" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password length must be atleast 6 characters" });
    }

    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    //parse token into cookies
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(201).json({ message: `signup error ${error}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { password, userName } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User is not exist" });
    }

    //match entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password); //bug solve login even without password

    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password!" });
    }

    //parse token into cookies
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json({ message: `user is login ${user}` });
  } catch (error) {
    return res.status(201).json({ message: `signin error ${error}` });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    return res.status(201).json({ message: `signout error ${error}` });
  }
};
