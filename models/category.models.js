import mongoose from "mongoose";

categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    description:{
        type: String,
    }
}, { timestamps: true });


const Category = mongoose.model("Category", categorySchema);

export default Category;