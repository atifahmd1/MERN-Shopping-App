import express from "express";
import { searchCategories, addCategory } from "../controllers/category.controller.js";

const router = express.Router();

// Endpoint to search categories
router.get("/search", searchCategories);

// Endpoint to add a new category
router.post("/add", addCategory);

export default router;
