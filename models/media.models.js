import mongoose from "mongoose";

const mediaSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });


const Media = mongoose.model("Media", mediaSchema);


export default Media;