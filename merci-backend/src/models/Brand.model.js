
import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true },
    logo: { type: String },
    description: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Brands" }, // Reference for parent brand
  },
  { timestamps: true }
);

// Pre-save hook to generate slug
BrandSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }
  next();
});

const Brand = mongoose.models.Brands || mongoose.model("Brand", BrandSchema);
export default Brand;

