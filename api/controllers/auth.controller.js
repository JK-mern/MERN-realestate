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



export const google = async (req,res,next) =>{
  try {

    const user = await User.findOne({email : req.body.email})

    if(user){

      const token = jwt.sign({id : user.id}, process.env.JWT_SECRET);
      const {password:pass, ...rest} = user._doc;
      res.cookie('accessToken', token, {httpOnly:true, maxAge : 1000*60*60*24*30}).status(200).json(rest)
    }
    else
    { 
        const generatedPassword = Math.random().toString(36).slice(-8)
        const hashedPassword = bcrypt.hashSync(generatedPassword,10)
        const newUser = new User({
          username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
          email:req.body.email,
          password : hashedPassword,
          avatar : req.body.photo
        })

        await newUser.save();
        const token = jwt.sign({id : newUser.id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = newUser._doc;
        res.cookie('accessToken', token, {httpOnly:true, maxAge : 1000*60*60*24*30}).status(200).json(rest)

    }
  } catch (error) {
    next(error)
  }
}


export const signOut = (req,res,next) =>{
  try {
    res.clearCookie('accessToken')
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error)
  }
}