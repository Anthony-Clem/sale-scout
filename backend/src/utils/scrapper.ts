import Tesseract from "tesseract.js";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import sharp from "sharp";
import { HTTPResponse } from "puppeteer";

export const scrapePriceAndImage = async (url: string) => {
  puppeteer.use(StealthPlugin());

  try {
    const browser = await puppeteer.launch({
      executablePath: "/path/to/chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "networkidle2" });

    const screenshotBuffer = await page.screenshot({ fullPage: true });
    const croppedBuffer = await sharp(screenshotBuffer)
      .extract({ left: 50, top: 200, width: 1500, height: 800 })
      .grayscale()
      .resize({ width: 1500 })
      .toBuffer();

    const {
      data: { text },
    } = await Tesseract.recognize(croppedBuffer, "eng");

    const priceRegex = /(?:\$|€|₹|£)\d+(?:\.\d{2})?/;
    const priceMatch = text.match(priceRegex);

    const imageSrc = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));

      const largestImage = images.reduce(
        (largest: { src: string | null; area: number }, img) => {
          const { naturalWidth, naturalHeight } = img;
          const area = naturalWidth * naturalHeight;
          return area > largest.area ? { src: img.src, area } : largest;
        },
        { src: null, area: 0 } // Initial value with the correct type
      ).src;

      return largestImage;
    });

    const productImage = imageSrc
      ? await page
          .goto(imageSrc)
          .then((res: HTTPResponse | null) => (res ? res.buffer() : null))
      : null;

    await browser.close();

    return {
      scrappedPrice: priceMatch
        ? parseFloat(priceMatch[0].replace(/[^0-9.]/g, ""))
        : null,
      scrappedImage: productImage,
    };
  } catch (error: any) {
    throw new Error(`Error scraping price and image: ${error.message}`);
  }
};
