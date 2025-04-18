import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.service.js";
import { User} from "../models/user.model.js"


const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res(response)

    //1.)
    const{fullName,email,username,password} = req.body;
    //console.log("email:",email);

    //2.)
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //3.)
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    //4.)
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //5.)
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "No, Avatar file is required")
    }

    //6.)
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    //7.)
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    //8.)
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    
    //9.)
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

   
})

export {registerUser}