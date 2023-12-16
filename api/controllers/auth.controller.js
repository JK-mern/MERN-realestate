import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created Successfully");
  } catch (error) {
    next(error)
  }
};
