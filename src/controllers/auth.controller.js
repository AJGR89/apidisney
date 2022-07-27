import User from "../models/User";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";

/* LOGIN */
export const login = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound) {
      return res
        .status(400)
        .json({ mesage: "user-password combination invalid" });
    }

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword) {
      return res
        .status(401)
        .json({ token: null, message: "user-password combination invalid" });
    }

    console.log(userFound);
    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 180, // 3 mm
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username: username,
      email: email,
      password: await User.encryptPassword(password),
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 180, // 3 mm
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
