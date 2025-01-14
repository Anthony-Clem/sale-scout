import cron from "node-cron";
import ProductModel from "../models/product.model";
import { scrapePriceAndImage } from "./scrapper";
import { sendMail } from "./sendMail";
import { getPriceDropTemplate } from "../lib/emailTemplates";
import UserModel from "../models/user.model";

const checkPriceAndSendEmail = async () => {
  try {
    const products = await ProductModel.find();
    if (!products) return;

    for (const product of products) {
      const { scrappedPrice } = await scrapePriceAndImage(product.url);
      if (!scrappedPrice) continue;

      const user = await UserModel.findById(product.userId);
      if (!user) continue;

      if (scrappedPrice < product.currentPrice) {
        product.currentPrice = scrappedPrice;

        const { error } = await sendMail({
          to: user.email,
          ...getPriceDropTemplate(
            product.name,
            product.url,
            product.currentPrice.toString()
          ),
        });

        if (error) {
          console.log(
            `Error sending email for product ${product.name}:`,
            error
          );
        }
      }

      product.currentPrice = scrappedPrice;
      product.initialPrice = Date.now();
      await product.save();
    }
  } catch (error) {
    console.error("Error in checkPriceAndSendEmail:", error);
  }
};

cron.schedule("0 6 * * *", checkPriceAndSendEmail);
