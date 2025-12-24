import sendMail from "../config/Mail.js";
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//signup
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
    return res.status(500).json({ message: `signup error ${error}` });
  }
};

//signin
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
    return res.status(500).json({ message: `signin error ${error}` });
  }
};

//signout
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `signout error ${error}` });
  }
};

// sendOtp = this is our first step of forgot password
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user with this email is not present" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    (user.resetOtp = otp),
      (user.otpExpires = Date.now() + 5 * 60 * 1000),
      (user.isOtpVerified = false);

    await user.save();
    sendMail(email, otp);

    return res.status(200).json({ message: "OTP successfully send" });
  } catch (error) {
    return res.status(500).json({ message: `send otp error ${error}` });
  }
};

//verifyOtp = this is our second step of forget password
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });

    if (user?.isOtpVerified) {
      return res.status(200).json({
        message: "OTP already verified",
      });
    }
    if (
      !user ||
      String(user.resetOtp) !== otp ||
      user.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "OTP successfully verified" });
  } catch (error) {
    return res.status(500).json({ message: `verify otp error ${error}` });
  }
};

//resetPassword = this is our third step of forget password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification requires" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.isOtpVerified = false;

    await user.save();

    return res
      .status(200)
      .json({ message: "Your Password Reset Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `resetpassword error ${error}` });
  }
};
