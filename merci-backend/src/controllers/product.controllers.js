//products.controller.js

import mongoose from "mongoose";
import createError from "../utils/error.js";
import Product from "../models/product.model.js"

export const addProduct = async (req, res, next) => {
  try {
    const { title, name, desc, img, thumbnail, price, size, category, brand, stock } = req.body;

    // Create a new product with the provided data
    const newProduct = new Product({
      title,
      name,
      desc,
      img, // Array of image URLs
      thumbnail, // Single thumbnail URL
      price,
      size,
      category,
      brand,
      stock,
    });

    // Save the product to the database
    const createdProduct = await newProduct.save();

    // Send a success response
    return res.status(201).json({
      message: "Product added successfully",
      product: createdProduct,
    });
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};


export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log("Product ID:", id);
    // console.log("New stock value:", req.body.stock);

    if (!id) {
      return next(createError(400, "Product ID is required"));
    }

    const product = await Product.findById(id);
    if (!product) {
      return next(createError(404, "Product not found"));
    }

    // console.log("Existing product:", product);

    product.stock = req.body.stock;

    try {
      const savedProduct = await product.save();
      // console.log("Updated product:", savedProduct);
      return res.status(200).json(savedProduct);
    } catch (saveError) {
      // console.error("Error saving product:", saveError);
      return next(createError(500, "Error saving product"));
    }
  } catch (err) {
    // console.error("Error finding product:", err);
    return next(createError(500, "Internal server error"));
  }
};

export const getProducts = async (req, res, next) => {
  try {
    //get all  products from products collection of mongodb
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    console.log("category: ", category);
    const products = await Product.find({ category });
    // console.log("products: ", products);
    if (!products) {
      return next(
        createError(404, `No products of this category: ${category} found.`)
      );
    }
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getFilteredProducts = async (req, res, next) => {
  try {
    console.log("Received request with query params:", req.query); // Log the query parameters

    let {
      categories,
      brands,
      sizes,
      search,
      priceRange,
      discountRange,
      stockAvailability,
    } = req.query;

    const filter = {};

    const minPrice = priceRange
      ? parseFloat(priceRange.split(",")[0])
      : undefined;
    const maxPrice = priceRange
      ? parseFloat(priceRange.split(",")[1])
      : undefined;
    const minDiscount = discountRange
      ? parseFloat(discountRange.split(",")[0])
      : undefined;
    const maxDiscount = discountRange
      ? parseFloat(discountRange.split(",")[1])
      : undefined;

    console.log("minPrice:", minPrice);
    console.log("maxPrice:", maxPrice);
    console.log("minDiscount:", minDiscount);
    console.log("maxDiscount:", maxDiscount);

    // Additional logging for clarity
    console.log("Initial query params:", {
      categories,
      brands,
      minPrice,
      maxPrice,
      sizes,
      search,
      stockAvailability,
    });

    // Convert categories, brands, and sizes to arrays if they are not already
    if (categories && !Array.isArray(categories)) {
      categories = [categories];
    }
    if (brands && !Array.isArray(brands)) {
      brands = [brands];
    }
    if (sizes && !Array.isArray(sizes)) {
      sizes = [sizes];
    }

    // Convert string ids to MongoDB ObjectId
    if (categories) {
      categories = categories.map(
        (category) => new mongoose.Types.ObjectId(category)
      );
      filter.category = { $in: categories };
    }

    if (brands) {
      brands = brands.map((brand) => new mongoose.Types.ObjectId(brand));
      filter.brand = { $in: brands };
    }

    if (sizes) {
      sizes = sizes.map((size) => new mongoose.Types.ObjectId(size));
      filter.size = { $in: sizes };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = minPrice;
      }
      if (maxPrice) {
        filter.price.$lte = maxPrice;
      }
    }

    if (minDiscount || maxDiscount) {
      filter.discountPercentage = {};
      if (minDiscount) {
        filter.discountPercentage.$gte = minDiscount;
      }
      if (maxDiscount) {
        filter.discountPercentage.$lte = maxDiscount;
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { tags: { $regex: new RegExp(search, "i") } },
      ];
    }

    // if (stockAvailability !== undefined) {
    //   filter.stock = stockAvailability === "true" ? { $gt: 0 } : { $lte: 0 };
    // }

    console.log("Constructed filter object:", filter); // Log the constructed filter object

    const products = await Product.find(filter);
    // console.log("Filtered products:", products); // Log the filtered products
    console.log("len:", products.length);
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error in getFilteredProducts:", err);
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid product ID"));
    }
    const product = await Product.findById(id);
    // console.log(product);
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};
