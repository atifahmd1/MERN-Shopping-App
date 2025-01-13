
//models/brand.model.js
import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  slug: { type: String },
  logo: { type: String },
  description: { type: String },
  parent: { type: String },
});

const Brand = mongoose.model("Brands", BrandSchema);
export default Brand;