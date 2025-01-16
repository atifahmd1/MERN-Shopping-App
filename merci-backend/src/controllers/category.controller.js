//controllers/category.controller.js
import Category from "../models/Category.model.js";
import createError from "../utils/error.js";

// Search for categories by name
export const searchCategories = async (req, res, next) => {
  try {
    const { query } = req.query; // `query` is the search term
    const categories = await Category.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// Add a new category
export const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(200).json({
        message: "Category already exists",
        category: existingCategory,
      });
    }

    const newCategory = new Category({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"), // Create a slug from the name
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({
      message: "Category added successfully",
      category: savedCategory,
    });
  } catch (err) {
    next(err);
  }
};
