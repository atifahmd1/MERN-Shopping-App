//models/Product.model.js 
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String },
  date: { type: Date, required: true, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }],
    price: { type: Number, required: true },
    MRP: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", default: "" },
    weight: { type: String },
    warrantyInformation: { type: String, default: "No warranty" },
    reviews: [reviewSchema],
    returnPolicy: { type: String, default: "10 days return policy" },
    minimumOrderQuantity: { type: Number, default: 1 },
    images: [{ type: String }],
    thumbnail: { type: String, required: true },
    size: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
  },
  { timestamps: true,
    strict: false
   }

);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;

