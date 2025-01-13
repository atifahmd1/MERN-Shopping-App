//models/product.model.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String },
  date: { type: Date, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  price: { type: Number, required: true },
  MRP: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brands", default: "" },
  weight: { type: String },
  warrantyInformation: { type: String, default:"no warranty" },
  reviews: [reviewSchema],
  returnPolicy: {
    type: String,
    default: "10 days return policy",
  },
  minimumOrderQuantity: { type: Number, default: 1 },
  images: [{ type: String }],
  thumbnail: { type: String, required: true },
  size: { type: mongoose.Schema.Types.ObjectId, ref: "Sizes" },
}, { timestamps: true });

const Product = mongoose.model("Products", productSchema);
export default Product;