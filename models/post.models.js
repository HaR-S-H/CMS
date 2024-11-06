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
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "media",
        required:true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        }
    ]
}, { timestamps: true })


const Post = mongoose.model("Post", postImage);

export default Post;