import mongoose from "mongoose";


const tagSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    
},{timestamps:true})