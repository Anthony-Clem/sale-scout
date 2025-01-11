import mongoose from "mongoose";

interface ProductDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  currentPrice: number;
  initialPrice: number;
  url: string;
  image: string;
  lastChecked: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    initialPrice: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    lastChecked: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;
