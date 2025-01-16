//products.controller.js
import mongoose from "mongoose";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";
import Brand from "../models/Brand.model.js";
import Size from "../models/Size.model.js";
import createError from "../utils/error.js";

export const addProduct = async (req, res, next) => {
  console.log("Received request to add product:", req.body);

  try {
    const {
      id,
      title,
      description,
      thumbnail,
      categories,
      price,
      MRP,
      stock,
      brand,
      weight,
      warrantyInformation,
      returnPolicy,
      minimumOrderQuantity,
      size,
      images,
      ...customFields
    } = req.body;

    // Validate required fields
    if (!id || !title || !price || !stock || !thumbnail) {
      return next(createError(400, "Please provide all required fields."));
    }

    // Convert `categories` (array of names) into ObjectIds
    const categoryIds = await Promise.all(
      categories.map(async (categoryName) => {
        const existingCategory = await Category.findOne({ name: categoryName });
        if (existingCategory) {
          return existingCategory._id;
        } else {
          // Create a new category if it doesn't exist
          const newCategory = new Category({
            name: categoryName,
            slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
          });
          const savedCategory = await newCategory.save();
          return savedCategory._id;
        }
      })
    );

    // Convert `brand` (name) into ObjectId
    let brandId = null;
    if (brand) {
      const existingBrand = await Brand.findOne({ name: brand });
      if (existingBrand) {
        brandId = existingBrand._id;
      } else {
        // Create a new brand if it doesn't exist
        const newBrand = new Brand({
          name: brand,
          slug: brand.toLowerCase().replace(/\s+/g, "-"),
        });
        const savedBrand = await newBrand.save();
        brandId = savedBrand._id;
      }
    }

    // Convert `size` (name) into ObjectId
    let sizeId = null;
    if (size) {
      const existingSize = await Size.findOne({ name: size });
      if (existingSize) {
        sizeId = existingSize._id;
      } else {
        // Create a new size if it doesn't exist
        const newSize = new Size({
          name: size,
          slug: size.toLowerCase().replace(/\s+/g, "-"),
        });
        const savedSize = await newSize.save();
        sizeId = savedSize._id;
      }
    }

    // Create the product
    const newProduct = new Product({
      id,
      title,
      description,
      thumbnail,
      category: categoryIds,
      price: Number(price),
      MRP: Number(MRP),
      stock: Number(stock),
      brand: brandId,
      weight,
      warrantyInformation,
      returnPolicy,
      minimumOrderQuantity: Number(minimumOrderQuantity),
      size: sizeId,
      images,
      ...customFields, // Add custom fields dynamically
    });

    // Save the product
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract product ID from the URL params
    const { category, brand, size, ...otherUpdates } = req.body; // Extract fields from request body

    // console.log("Received request to update product:", otherUpdates);

    if (!id) {
      return next(createError(400, "Product ID is required"));
    }

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return next(createError(404, "Product not found"));
    }

    // Handle category updates
    if (category && Array.isArray(category)) {
      const categoryIds = await Promise.all(
        category.map(async (categoryName) => {
          const existingCategory = await Category.findOne({ name: categoryName });
          if (existingCategory) {
            return existingCategory._id;
          } else {
            const newCategory = new Category({
              name: categoryName,
              slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
            });
            const savedCategory = await newCategory.save();
            return savedCategory._id;
          }
        })
      );
      product.category = categoryIds;
    }

    // Handle brand updates
    if (brand) {
      const existingBrand = await Brand.findOne({ name: brand });
      if (existingBrand) {
        product.brand = existingBrand._id;
      } else {
        const newBrand = new Brand({
          name: brand,
          slug: brand.toLowerCase().replace(/\s+/g, "-"),
        });
        const savedBrand = await newBrand.save();
        product.brand = savedBrand._id;
      }
    }

    // Handle size updates
    if (size) {
      const existingSize = await Size.findOne({ name: size });
      if (existingSize) {
        product.size = existingSize._id;
      } else {
        const newSize = new Size({
          name: size,
          slug: size.toLowerCase().replace(/\s+/g, "-"),
        });
        const savedSize = await newSize.save();
        product.size = savedSize._id;
      }
    }

    // Update other fields dynamically
    Object.keys(otherUpdates).forEach((key) => {
      // console.log(`Updating field: ${key} with value: ${otherUpdates[key]}`);
      product[key] = otherUpdates[key];
    });

    console.log("Updated product:", product); // Log the updated product

    // Save the updated product to the database
    const updatedProduct = await product.save();

    console.log("Product updated successfully!"); // Log success message

    return res.status(200).json(updatedProduct); // Return the updated product
  } catch (err) {
    return next(createError(500, "Internal server error"));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return next(err);
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
    console.log(id);
    const product = await Product.findOne({id:id})
      .populate("category")
      .populate("brand")
      .populate("size");
    console.log(product);
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};
