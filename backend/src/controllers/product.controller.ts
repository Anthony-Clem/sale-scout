import { z } from "zod";
import { productScehma } from "../lib/schemas";
import ProductModel from "../models/product.model";
import { scrapePriceAndImage } from "../utils/scrapper";
import { tryCatch } from "../utils/tryCatch";
import { sendMail } from "../utils/sendMail";
import { getProductTrackingTemplate } from "../lib/emailTemplates";
import UserModel from "../models/user.model";
import cloudinary from "../config/cloudinary";
import { DEFAULT_IMAGE, MAX_PRODUCTS } from "../lib/constants";

export const addProduct = tryCatch(async (req, res) => {
  const { name, url } = productScehma.parse(req.body);
  const userId = req.userId;

  const userAgent = req.headers["user-agent"] || "";
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  if (isIOS) {
    return res
      .status(400)
      .json({
        message:
          "This feature requires Chrome. Please use Chrome on a non-iOS device.",
      });
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const productsCount = await ProductModel.countDocuments({ userId });

  if (productsCount >= MAX_PRODUCTS) {
    return res
      .status(400)
      .json({ message: "You can only track up to 10 products" });
  }

  if (!url.includes("www.target.com") && !url.includes("www.bestbuy.com")) {
    return res.status(400).json({ message: "This site is not supported" });
  }

  const { scrappedImage, scrappedPrice } = await scrapePriceAndImage(url);

  const price = scrappedPrice || null;
  const image = scrappedImage || DEFAULT_IMAGE;

  if (!price) {
    return res.status(404).json({ message: "Price not found" });
  }

  let imageUrl;
  try {
    if (typeof image === "string") {
      imageUrl = await cloudinary.uploader.upload(image);
    } else if (Buffer.isBuffer(image)) {
      const base64Image = `data:image/png;base64,${image.toString("base64")}`;
      imageUrl = await cloudinary.uploader.upload(base64Image);
    } else {
      throw new Error("Unsupported image format");
    }
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
  }

  const product = await ProductModel.create({
    name,
    url,
    userId: userId,
    currentPrice: price,
    initialPrice: price,
    image: imageUrl?.secure_url,
  });

  const { error } = await sendMail({
    to: user.email,
    ...getProductTrackingTemplate(product.name, product.url),
  });

  if (error) {
    console.log(error);
  }

  res.status(200).json(product);
});

export const getProducts = tryCatch(async (req, res) => {
  const userId = req.userId;

  const products = await ProductModel.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json(products);
});

export const updateProduct = tryCatch(async (req, res) => {
  const userId = req.userId;

  const id = z.string().min(1, "Required").max(24).parse(req.params.id);
  const name = z.string().trim().min(1, "Required").parse(req.body.name);

  const product = await ProductModel.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    {
      name,
    }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

export const deleteProduct = tryCatch(async (req, res) => {
  const userId = req.userId;

  const id = z.string().min(1, "Required").max(24).parse(req.params.id);

  const product = await ProductModel.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.image) {
    const imgId = product.image.split("/").pop()?.split(".")[0];

    if (imgId) {
      try {
        await cloudinary.uploader.destroy(imgId);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Product deleted, but failed to delete image" });
      }
    }
  }

  res.status(200).json({ message: "Product deleted successfully" });
});
