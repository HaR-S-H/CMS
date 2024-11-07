import mongoose from "mongoose";

postSchema = mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        }
    ],
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
        required: true,
    },
    postImage: {
        type: String,
        required:true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    views: {
        type: Number,
        default: 0,
    }
}, { timestamps: true })


const Post = mongoose.model("Post", postImage);

export default Post;