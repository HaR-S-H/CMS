import Category from "../models/category.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
const addCategory = asyncHandler(async(req, res)=> {
    const { name, description } = req.body;
    if (!name || !description) {
        throw new ApiError(400, "please provide a name and description");
    }
    const category = new Category({
        name,
        description
    })
    category.save();
    res.status(201).json(new ApiResponse(201, { category }, "category saved successfully"));
})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    if (!categories) {
        throw new ApiError(404, "No categories found");
    }
    res.json(new ApiResponse(201, { categories }, "all categories are getted successfully"));
});

const deleteCategory = asyncHandler(async(req, res) =>{
    const category = await Category.findByIdAndDelete(req.params._id);
    if (!category) {
        throw new ApiError(404, "category not found");
    }
    res.json(new ApiResponse(200, { category }, "category deleted successfully"));
})


export { addCategory };