// // ----------- CONTROLLERS ---------------

// //cart.controller.js
// import User from "../models/User.js";
// import Product from "../models/Products.js";
// import createError from "../utils/error.js";

// // Get Cart Items
// export const getCartItems = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).populate({
//       path: "cart.product",
//       model: "Products",
//     });
//     if (!user) {
//       return next(createError(404, "User not found!"));
//     }
//     return res.status(200).json(user.cart);
//   } catch (err) {
//     next(err);
//   }
// };

// // Add Item to Cart
// export const addToCart = async (req, res, next) => {
//   const { id, quantity } = req.body;

//   if (!id) {
//     return next(createError(400, "Product Id is required!"));
//   }
//   if (!quantity) {
//     quantity = 1;
//   }

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return next(createError(404, "Product not found!"));
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return next(createError(404, "User not found!"));
//     }

//     const cartItem = user.cart.find((item) => item.product.toString() === id);
//     if (cartItem) {
//       cartItem.quantity += quantity;
//     } else {
//       user.cart.push({ product: id, quantity });
//     }

//     await user.save();

//     await user.populate({
//       path: "cart.product",
//       model: "Products",
//     });

//     // console.log("user.cart: ", user.cart);

//     return res.status(200).json(user.cart);
//   } catch (err) {
//     next(err);
//   }
// };

// // Update Item Quantity in Cart
// export const updateItemQuantity = async (req, res, next) => {
//   const { productId } = req.params;
//   const { quantity } = req.body;

//   if (!productId || !quantity) {
//     return next(createError(400, "Product ID and quantity are required!"));
//   }

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return next(createError(404, "User not found!"));
//     }

//     const cartItem = user.cart.find(
//       (item) => item.product.toString() === productId
//     );
//     if (!cartItem) {
//       return next(createError(404, "Product not found in cart!"));
//     }

//     cartItem.quantity = quantity;
//     await user.save();

//     await user.populate({
//       path: "cart.product",
//       model: "Products",
//     });

//     return res.status(200).json(user.cart);
//   } catch (err) {
//     next(err);
//   }
// };

// // Remove Item from Cart
// export const removeFromCart = async (req, res, next) => {
//   const { productId } = req.params;
//   //   console.log(productId);
//   if (!productId) {
//     return next(createError(400, "Product ID is required!"));
//   }

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return next(createError(404, "User not found!"));
//     }

//     user.cart = user.cart.filter((item) => {
//       return item.product.toString() !== productId;
//     });
//     await user.save();

//     await user.populate({
//       path: "cart.product",
//       model: "Products",
//     });

//     return res.status(200).json(user.cart);
//   } catch (err) {
//     next(err);
//   }
// };

// // Clear Cart
// export const clearCart = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return next(createError(404, "User not found!"));
//     }

//     user.cart = [];
//     await user.save();

//     return res
//       .status(200)
//       .json({ message: "Cart cleared successfully!", cart: user.cart });
//   } catch (err) {
//     next(err);
//   }
// };


// // favorites.controller.js
// import User from "../models/User.js";
// import Products from "../models/Products.js";
// import mongoose from "mongoose";

// export const getUser = async (req, res) => {
//   // console.log("getuser req.user: ", req.user);
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getFavorites = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate("favorites");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user.favorites);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const addFavorite = async (req, res) => {
//   const userId = req.user.id;
//   const { productId } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(productId)) {
//     return res.status(400).json({ message: "Invalid product ID" });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Optionally, check if the product exists
//     const productExists = await Products.findById(productId);
//     if (!productExists) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     if (!user.favorites.includes(productId)) {
//       user.favorites.push(productId);
//       await user.save();
//       // console.log("user.favorites: ", user);
//     }

//     // Populate favorites with product details
//     const populatedUser = await User.findById(userId).populate("favorites");
//     res.json(populatedUser.favorites);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const removeFavorite = async (req, res) => {
//   const userId = req.user.id;
//   const { productId } = req.params;
//   // console.log("removeFavorite: ", productId, userId);

//   try {
//     const user = await User.findById(userId);
//     user.favorites.pull(productId);
//     await user.save();
//     const populatedUser = await User.findById(userId).populate("favorites");
//     // console.log("fav:", populatedUser.favorites);
//     res.json(populatedUser.favorites);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const clearFavorites = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     const user = await User.findById(userId);
//     // console.log("clearFavorites: ", user);
//     user.favorites = [];
//     await user.save();
//     // console.log("clearFavoritesafter save: ", user);
//     res.json(user.favorites);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// //filter.parameters.controller.js
// import Category from "../models/Category.model.js";
// import createError from "../utils/error.js";
// import Brand from "../models/Brand.model.js";
// import Size from "../models/Size.model.js";

// export const getCategoriesName = async (req, res, next) => {
//   try {
//     const categories = await Category.find();
//     // console.log(categories);
//     if (!categories) {
//       return next(createError(404, "No category available right now."));
//     }

//     return res.status(200).json(categories);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getBrandsName = async (req, res, next) => {
//   try {
//     const brands = await Brand.find();

//     if (!brands) {
//       return next(createError(404, "No brand available right now."));
//     }

//     return res.status(200).json(brands);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getSizes = async (req, res, next) => {
//   try {
//     const sizes = await Size.find();

//     if (!sizes) {
//       return next(createError(404, "No size available right now."));
//     }

//     return res.status(200).json(sizes);
//   } catch (err) {
//     next(err);
//   }
// };

// //payment.controller.js
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import createError from "../utils/error.js";
// import Order from "../models/Orders.js";


// export const createOrder = async (req, res, next) => {
//   const { products, total_amount, address, payment_method } = req.body;
//   // console.log(req.body);

//   if (!total_amount) {
//     return next(createError(400, "Total amount is required!"));
//   }

//   const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET,
//   });

//   // console.log(razorpay);

//   try {
//     let razorpayOrder;
//     if (payment_method === "Razorpay") {
//       // Create Razorpay order if payment method is Razorpay
//       const options = {
//         amount: Math.round(total_amount * 100),
//         currency: "INR",
//         receipt: `receipt_${Date.now()}`,
//         payment_capture: 1,
//       };
//       razorpayOrder = await razorpay.orders.create(options);
//     }

//     // console.log(req.user);

//     // Create order in the database
//     const order = new Order({
//       products,
//       user: req.user.id, // Assuming user info is in req.user
//       total_amount,
//       address,
//       payment_method,
//       razorpay_order_id: razorpayOrder?.id,
//     });

//     await order.save();

//     res.status(200).json({ order });
//   } catch (err) {
//     next(createError(500, "Error in creating order!"));
//   }
// };

// export const verifyPayment = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
//   console.log("req.body: ", req.body);
//   if (!razorpay_order_id) {
//     return res
//       .status(400)
//       .json({ msg: "razorpay_order_id is required", success: false });
//   }
//   if (!razorpay_payment_id) {
//     return res
//       .status(400)
//       .json({ msg: "razorpay_payment_id is required", success: false });
//   }
//   if (!razorpay_signature) {
//     return res
//       .status(400)
//       .json({ msg: "razorpay_signature is required", success: false });
//   }
//   const expectedSign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");
//   console.log("testing...");
//   console.log("expectedSign: ", expectedSign);
//   console.log("razorpay_signature: ", razorpay_signature);
//   if (expectedSign === razorpay_signature) {
//     return res.status(200).json({ msg: "Payment verified", success: true });
//   } else {
//     return res.status(400).json({ msg: "Invalid signature", success: false });
//   }
// };


// //Prodcts.js
// //products.controller.js

// import mongoose from "mongoose";
// import Products from "../models/Products.js";
// import createError from "../utils/error.js";

// export const addProducts = async (req, res, next) => {
//   try {
//     const productsData = req.body;

//     if (!Array.isArray(productsData)) {
//       return next(
//         createError(400, "Invalid request. Expected an array of products")
//       );
//     }

//     const createdproducts = [];

//     for (const productInfo of productsData) {
//       const { title, name, desc, img, price, sizes, category } = productInfo;

//       const product = new Products({
//         title,
//         name,
//         desc,
//         img,
//         price,
//         sizes,
//         category,
//       });
//       const createdproduct = await product.save();

//       createdproducts.push(createdproduct);
//     }

//     return res
//       .status(201)
//       .json({ message: "Products added successfully", createdproducts });
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateProduct = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     // console.log("Product ID:", id);
//     // console.log("New stock value:", req.body.stock);

//     if (!id) {
//       return next(createError(400, "Product ID is required"));
//     }

//     const product = await Products.findById(id);
//     if (!product) {
//       return next(createError(404, "Product not found"));
//     }

//     // console.log("Existing product:", product);

//     product.stock = req.body.stock;

//     try {
//       const savedProduct = await product.save();
//       // console.log("Updated product:", savedProduct);
//       return res.status(200).json(savedProduct);
//     } catch (saveError) {
//       // console.error("Error saving product:", saveError);
//       return next(createError(500, "Error saving product"));
//     }
//   } catch (err) {
//     // console.error("Error finding product:", err);
//     return next(createError(500, "Internal server error"));
//   }
// };

// export const getProducts = async (req, res, next) => {
//   try {
//     //get all  products from products collection of mongodb
//     const products = await Products.find();
//     return res.status(200).json(products);
//   } catch (err) {
//     next(err);
//   }
// };
// export const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.params;
//     console.log("category: ", category);
//     const products = await Products.find({ category });
//     // console.log("products: ", products);
//     if (!products) {
//       return next(
//         createError(404, `No products of this category: ${category} found.`)
//       );
//     }
//     return res.status(200).json(products);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getFilteredProducts = async (req, res, next) => {
//   try {
//     console.log("Received request with query params:", req.query); // Log the query parameters

//     let {
//       categories,
//       brands,
//       sizes,
//       search,
//       priceRange,
//       discountRange,
//       stockAvailability,
//     } = req.query;

//     const filter = {};

//     const minPrice = priceRange
//       ? parseFloat(priceRange.split(",")[0])
//       : undefined;
//     const maxPrice = priceRange
//       ? parseFloat(priceRange.split(",")[1])
//       : undefined;
//     const minDiscount = discountRange
//       ? parseFloat(discountRange.split(",")[0])
//       : undefined;
//     const maxDiscount = discountRange
//       ? parseFloat(discountRange.split(",")[1])
//       : undefined;

//     console.log("minPrice:", minPrice);
//     console.log("maxPrice:", maxPrice);
//     console.log("minDiscount:", minDiscount);
//     console.log("maxDiscount:", maxDiscount);

//     // Additional logging for clarity
//     console.log("Initial query params:", {
//       categories,
//       brands,
//       minPrice,
//       maxPrice,
//       sizes,
//       search,
//       stockAvailability,
//     });

//     // Convert categories, brands, and sizes to arrays if they are not already
//     if (categories && !Array.isArray(categories)) {
//       categories = [categories];
//     }
//     if (brands && !Array.isArray(brands)) {
//       brands = [brands];
//     }
//     if (sizes && !Array.isArray(sizes)) {
//       sizes = [sizes];
//     }

//     // Convert string ids to MongoDB ObjectId
//     if (categories) {
//       categories = categories.map(
//         (category) => new mongoose.Types.ObjectId(category)
//       );
//       filter.category = { $in: categories };
//     }

//     if (brands) {
//       brands = brands.map((brand) => new mongoose.Types.ObjectId(brand));
//       filter.brand = { $in: brands };
//     }

//     if (sizes) {
//       sizes = sizes.map((size) => new mongoose.Types.ObjectId(size));
//       filter.size = { $in: sizes };
//     }

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) {
//         filter.price.$gte = minPrice;
//       }
//       if (maxPrice) {
//         filter.price.$lte = maxPrice;
//       }
//     }

//     if (minDiscount || maxDiscount) {
//       filter.discountPercentage = {};
//       if (minDiscount) {
//         filter.discountPercentage.$gte = minDiscount;
//       }
//       if (maxDiscount) {
//         filter.discountPercentage.$lte = maxDiscount;
//       }
//     }

//     if (search) {
//       filter.$or = [
//         { title: { $regex: new RegExp(search, "i") } },
//         { description: { $regex: new RegExp(search, "i") } },
//         { tags: { $regex: new RegExp(search, "i") } },
//       ];
//     }

//     // if (stockAvailability !== undefined) {
//     //   filter.stock = stockAvailability === "true" ? { $gt: 0 } : { $lte: 0 };
//     // }

//     console.log("Constructed filter object:", filter); // Log the constructed filter object

//     const products = await Products.find(filter);
//     // console.log("Filtered products:", products); // Log the filtered products
//     console.log("len:", products.length);
//     return res.status(200).json(products);
//   } catch (err) {
//     console.error("Error in getFilteredProducts:", err);
//     next(err);
//   }
// };

// export const getProductById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     // console.log(id);
//     if (!mongoose.isValidObjectId(id)) {
//       return next(createError(400, "Invalid product ID"));
//     }
//     const product = await Products.findById(id);
//     // console.log(product);
//     if (!product) {
//       return next(createError(404, "Product not found"));
//     }
//     return res.status(200).json(product);
//   } catch (err) {
//     return next(err);
//   }
// };

// //User.js
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import createError from "../utils/error.js";
// import User from "../models/User.js";
// import Orders from "../models/Orders.js";

// dotenv.config();

// //user register controller
// export const UserRegister = async (req, res, next) => {
//   try {
//     const { fullName, email, password } = req.body;
//     console.log(fullName, email, password);
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return next(createError(409, "Email is already in use"));
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const hashedpassword = bcrypt.hashSync(password, salt);

//     const user = new User({
//       name: fullName,
//       email,
//       password: hashedpassword,
//     });
//     const createduser = user.save();
//     const token = jwt.sign({ id: createduser._id }, process.env.JWT, {
//       expiresIn: "1 hour",
//     });
//     console.log(token);
//     return res.status(201).json({ token, user });
//   } catch (error) {
//     return next(error);
//   }
// };

// //user login controller
// export const UserLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email);
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       return next(createError(404, "user not found"));
//     }

//     const isPasswordCorrect = await bcrypt.compareSync(
//       password,
//       existingUser.password
//     );
//     if (!isPasswordCorrect) {
//       return next(createError(403, "Incorrect password"));
//     }
//     const token = jwt.sign({ id: existingUser._id }, process.env.JWT, {
//       expiresIn: "1 hour",
//     });
//     return res.status(200).json({ token, user: existingUser });
//   } catch (error) {
//     return next(error);
//   }
// };

// export const getUser = async (req, res) => {
//   console.log("getuser req.user: ", req.user);
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateUserDetails = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.body.id,
//       req.body.updatedUser,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!user) {
//       return next(createError(404, "User not found"));
//     }
//     return res.status(200).json({ message: "User updated successfully", user });
//   } catch (err) {
//     next(err);
//   }
// };

// // Order

// export const placeOrder = async (req, res, next) => {
//   try {
//     const { products, address, totalAmount } = req.body;
//     const userJWT = req.user;
//     const user = await User.findById(userJWT.id);
//     const order = new Orders({
//       products,
//       user: user._id,
//       total_amount: totalAmount,
//       address,
//     });
//     await order.save();

//     user.cart.save();

//     user.cart = [];
//     await user.save();

//     return res
//       .status(200)
//       .json({ message: "Order placed successfully", order });
//   } catch (err) {
//     next(err);
//   }
// };

// export const getAllOrders = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const orders = await Orders.find({ user: user.id });
//     return res.status(200).json(orders);
//   } catch (err) {
//     next(err);
//   }
// };


// //------------------- Models -----------------------------
// //Brand.model.js
// import mongoose from "mongoose";

// const BrandSchema = new mongoose.Schema({
//   name: { type: String, unique: true, required: true },
//   slug: { type: String },
//   logo: { type: String },
//   description: { type: String },
//   parent: { type: String },
// });

// const Brand = mongoose.model("Brand", BrandSchema);
// export default Brand;


// //Category.model.js
// import mongoose from "mongoose";

// const CategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   slug: {
//     type: String,
//   },
// });

// const Category = mongoose.model("Category", CategorySchema);
// export default Category;

// import mongoose from "mongoose";

// const OrdersSchema = new mongoose.Schema(
//   {
//     products: {
//       type: [
//         {
//           product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
//           quantity: { type: Number, default: 1 },
//         },
//       ],
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     total_amount: {
//       type: mongoose.Types.Decimal128,
//       required: true,
//     },
//     address: {
//       type: String,
//       default: "",
//     },
//     paid: {
//       type: mongoose.Types.Decimal128,
//       default: 0,
//     },
//     payment_method: {
//       type: String,
//       enum: ["Razorpay", "CashOnDelivery"],
//       required: true,
//     },
//     razorpay_order_id: String,
//     razorpay_payment_id: String,
//     razorpay_signature: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Shopping-Orders", OrdersSchema);

// //Products.js
// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   rating: { type: Number, required: true },
//   comment: { type: String },
//   date: { type: Date, required: true },
//   reviewerName: { type: String, required: true },
//   reviewerEmail: { type: String, required: true },
// });

// const dimensionsSchema = new mongoose.Schema({
//   width: { type: Number },
//   height: { type: Number },
//   depth: { type: Number },
// });

// const metaSchema = new mongoose.Schema({
//   createdAt: { type: Date },
//   updatedAt: { type: Date },
//   barcode: { type: String },
//   qrCode: { type: String },
// });

// const productSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true,
//   },
//   price: { type: Number, required: true },
//   discountPercentage: { type: Number, required: true },
//   rating: { type: Number, required: true, default: 0 },
//   stock: { type: Number, required: true },
//   tags: [{ type: String, required: true }],
//   brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", default: null },
//   sku: { type: String },
//   weight: { type: Number },
//   dimensions: dimensionsSchema,
//   warrantyInformation: { type: String },
//   shippingInformation: { type: String },
//   availabilityStatus: { type: String },
//   reviews: [reviewSchema],
//   returnPolicy: {
//     type: String,
//     required: true,
//     default: "10 days return policy",
//   },
//   minimumOrderQuantity: { type: Number, required: true, default: 1 },
//   meta: metaSchema,
//   images: [{ type: String }],
//   thumbnail: { type: String, required: true },
//   size: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
// });

// const Products = mongoose.model("Products", productSchema);
// export default Products;


// //Size.model.js
// import mongoose from "mongoose";

// const SizeSchema = new mongoose.Schema({
//   name: { type: String, unique: true, required: true },
//   slug: { type: String },
//   description: { type: String },
// });

// const Size = mongoose.model("Size", SizeSchema);
// export default Size;

// //User.js
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     img: {
//       type: String,
//       default: null,
//     },
//     phone: {
//       type: String,
//       default: null,
//     },
//     address: {
//       type: [
//         {
//           street: { type: String, required: true },
//           city: { type: String, required: true },
//           state: { type: String, required: true },
//           zip: { type: String, required: true },
//           country: { type: String, default: "India" },
//         },
//       ],
//       default: [],
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     cart: {
//       type: [
//         {
//           product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
//           quantity: { type: Number, default: 1 },
//         },
//       ],
//       default: [],
//     },
//     favorites: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "Products",
//       default: [],
//     },
//     orders: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "Shopping-Orders",
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Users", UserSchema);


// // --------------- ROUTES ----------------------

// //Order.js
// import fs from "fs";
// import express from "express";
// import { createInvoice } from "../utils/invoice.js";

// const router = express.Router();

// // Route to generate and download the invoice as a PDF
// router.get("/invoice/:orderId", async (req, res) => {
//   console.log(`Generating invoice for order`);
//   const { orderId } = req.params;

//   const orderDetails = {
//     product: { title: "Sample Product" },
//     orderId: "123456789",
//     orderDate: "2024-08-12",
//     orderPrice: 1000.0,
//     invoiceNumber: "INV-2024-001",
//     invoiceDate: "2024-08-12",
//     totalAmount: 1180.0,
//     taxRate: 18,
//     taxAmount: 180.0,
//     discount: 50.0,
//     sellerInfo: {
//       name: "R K WorldInfocom Pvt. Ltd.",
//       address: "Address details ...",
//       pan: "ABCDE1234F",
//       gst: "27ABCDE1234F1Z5",
//     },
//   };
//   const pdfBytes = await createInvoice(orderDetails);
//   // Save or send the PDF file using pdfBytes

//   try {
//     const pdfBuffer = await createInvoice(orderDetails);
//     const buffer = Buffer.from(pdfBuffer);

//     res.setHeader("Content-Type", "application/pdf");

//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=Invoice-${orderId}.pdf`
//     );

//     res.send(buffer);
//   } catch (error) {
//     console.error("Error generating invoice:", error);
//     res.status(500).send("Error generating invoice");
//   }
// });

// router.get("/:orderId", async (req, res) => {
//   console.log("hello");
//   const { orderId } = req.params;

//   // Dummy order details, replace this with a database call
//   const orderDetails = {
//     orderId: orderId,
//     orderDate: "2024-08-08",
//     orderPrice: 100,
//     orderAddress: "123 Main St, City, Country",
//     trackingInfo: "Shipped via XYZ, Tracking No. 123456789",
//     product: {
//       id: "product123",
//       title: "Sample Product",
//       thumbnail: "https://example.com/sample-thumbnail.jpg",
//     },
//   };

//   res.json(orderDetails);
// });

// export default router;

// //Products.js
// import express from "express";
// import {
//   addProducts,
//   updateProduct,
//   getProducts,
//   getProductById,
//   getProductsByCategory,
//   getFilteredProducts,
// } from "../controllers/Products.js";
// import {
//   getBrandsName,
//   getCategoriesName,
//   getSizes,
// } from "../controllers/filter.parameters.controller.js";

// const router = express.Router();

// router.post("/add", addProducts);
// router.patch("/update/:id", updateProduct);
// router.get("/", getProducts);
// router.get("/category/:category", getProductsByCategory);
// // router.get("/filter", getFilteredProducts);

// //filter-parameters
// router.get("/filter", getFilteredProducts);
// router.get("/filter/categories", getCategoriesName);
// router.get("/filter/brands", getBrandsName);
// router.get("/filter/sizes", getSizes);
// router.get("/:id", getProductById);

// export default router;

// //User.js
// import express from "express";
// import {
//   UserLogin,
//   UserRegister,
//   getUser,
//   getAllOrders,
//   placeOrder,
//   updateUserDetails,
// } from "../controllers/User.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

// import {
//   addFavorite,
//   clearFavorites,
//   getFavorites,
//   removeFavorite,
// } from "../controllers/favorites.controller.js";
// import {
//   getCartItems,
//   addToCart,
//   updateItemQuantity,
//   removeFromCart,
//   clearCart,
// } from "../controllers/cart.controller.js";

// import {
//   createOrder,
//   verifyPayment,
// } from "../controllers/payment.controller.js";

// const router = express.Router();

// //user
// router.post("/signup", UserRegister);
// router.post("/login", UserLogin);
// router.get("/me", verifyToken, getUser);
// router.put("/update", updateUserDetails);

// //cart
// router.get("/cart", verifyToken, getCartItems);
// router.post("/cart", verifyToken, addToCart);
// router.patch("/cart/:productId", verifyToken, updateItemQuantity);
// router.delete("/cart/:productId", verifyToken, removeFromCart);
// router.delete("/cart", verifyToken, clearCart);

// //order
// router.get("/orders", verifyToken, getAllOrders);
// router.post("/order/checkout", verifyToken, createOrder);
// router.post("/order/verifypayment", verifyPayment);
// router.post("/order/placeOrder", verifyToken, placeOrder);

// //favourites
// router.get("/favorites", verifyToken, getFavorites);
// router.post("/favorites", verifyToken, addFavorite);
// router.delete("/favorites", verifyToken, clearFavorites);
// router.delete("/favorites/:productId", verifyToken, removeFavorite);

// export default router;


// // ------------- APP -----------------------
// import * as dotenv from "dotenv";
// import express from "express";
// import cors from "cors";

// import connectDB from "./db/connection.js";

// // configDotenv();
// dotenv.config();

// const app = express();
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// import UserRouter from "../src/routes/User.js";
// import ProductRoutes from "../src/routes/Products.js";
// import OrderRoutes from "../src/routes/Order.js";

// app.use("/api/user", UserRouter);
// app.use("/api/products", ProductRoutes);
// app.use("/api/orders", OrderRoutes);

// //error handling
// app.use((err, req, res, next) => {
//   console.error("Global Error Handler:", err); // Log the error
//   const status = err.status || 500;
//   const message = err.message || "Something went wrong";
//   return res.status(status).json({
//     success: false,
//     status,
//     message: message,
//   });
// });

// app.get("/", async (req, res) => {
//   res.status(200).json({
//     message: "Hello World!\nI'm a Node.js API",
//   });
// });

// connectDB();

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });


// // above are my backkend code of app.js, controllers, model and routes
// // now i want to increase functionality like seller can add/update or delete their product