import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (user_id) => {
    try {
        const user = await User.findById(user_id);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "error occurred while generating tokens");
    }

}
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role, } = req.body;
    if (
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "please provide all the fields");
    }
    const existingUser = await User.findOne({
        $or: [{ email, username }]
    });
    
    if (existingUser) {
        throw new ApiError(400, "user already exists");
    }
    const newUser = new User({
        username,
        email,
        password,
        role,
    })
    await newUser.save();

    return res.status(201).json(
        new ApiResponse(200, newUser, "user created successfully"));
});


const logIn = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body;
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "please provide all the fields");
    }
    const user = await User.findOne({
        $or: [{ username }, { email }],
    })
    if (!user) {
        throw new ApiError(404, "user not found");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password"); 
    const options = {
        secure: true,
        httpOnly: true,
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken).json(new ApiResponse(200, { loggedInUser, accessToken, refreshToken }, "user logged in successfully"));

});

export { registerUser, logIn };