import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
    username: {
        type: "String",
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: "String",
        required: true,
        unique: true,
    },
    password: {
        type: "String",
        required: true,
    },
    role: {
        type: "String",
        enum: ["admin", "user"],
        default: "user"
    },
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"Post"
        }
    ],
    refreshToken: {
        type: "String",
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = async function (password) { 
    return await bcryptjs.compare(password, this.password);
}



userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema);

export default User;