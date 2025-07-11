import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async(req,res) =>{
  try {
    const {fullname, password, email, phoneNumber, role} = req.body;
    if(!fullname || !password || !email || !phoneNumber || !role){
      return res.status(400).json({
        message:"something is missing",
        success:false,
      });
    };
      const user = await User.findOne({email});
      if(user){
        return res.status(400).json({
          message:"user already exists with this email",
          success:false,
        })
      }

      const hashedPassword = await bcrypt.hash(password,10);

      await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role
      });
       return res.status(201).json({
        message:"Account created Successfully",
        success:true,
       });
    
  } catch (error) {
    console.log(error);
  }
}

export const login = async(req,res)=>{
  try {
    const { password, email,  role} = req.body;
    if( !password || !email || !role){
      return res.status(400).json({
        message:"something is missing",
        success:false,
      });
    };
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message:"Incorrect email or password",
        success:false,
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        message:"Incorrect email or password",
        success:false,
      })
    };
    // check role is correct or not

    if(role != user.role){
      return res.status(400).json({
        message:"Account does not exist with current role",
        success:false,
      })
    };
    const tokenData = {
      userId: user._id
    }

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});

    user ={
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
      message:`Welcome back ${user.fullname}`,
      success:true
    })

  } catch (error) {
    console.log(error);
  }
}

export const logout = async(req,res)=>{
try {
  return res.status(200).cookie("token", "", {maxAge:0}).json({
    message:"Logged out successfully",
    success:true
  })
} catch (error) {
  console.log(error);
}
}
// update user profile
export const updateProfile = async(req,res)=>{
  try {
    const{fullname, email, phoneNumber, bio, skills} = req.body;
    const file = req.file;
    let skillsArray;
    if(skills){
      const skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if(!user){
      return res.status(400).json({
        message: "User not found",
        success: false
      })
    }
// updating data
    if(fullname) user.fullname = fullname
    if(email) user.email = email
    if(phoneNumber) user.phoneNumber = phoneNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillsArray
    
    // later resumes data comes here

    await user.save();

    user ={
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      message:"Profile updated successfully",
      user,
      success:true
    })

  } catch (error) {
    console.log(error);
  }
}