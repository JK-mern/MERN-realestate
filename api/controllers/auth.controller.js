import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created Successfully");
  } catch (error) {
    next(error); //router will go to the middleware having four paramters (error handling middleware)
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);
    if (!validUser) {
      return next(errorHandler(404, "User not Found!"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }
    const {password:pass , ...rest} = validUser._doc
    const token = jwt.sign({id : validUser.id}, process.env.JWT_SECRET)
    res.cookie('accessToken',token,{httpOnly : true , maxAge: 1000*60*60*24*30}).status(200).json(rest)
  } catch (error) {
    next(error);
  }
};
