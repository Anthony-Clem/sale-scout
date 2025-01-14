# Salescout

Salescout is a web application that allows users to track the prices of products and receive email notifications when the price drops below its initial value. The app uses modern technologies to provide accurate price tracking and efficient notification services.

## Features

- **Price Tracking**: Monitor the prices of your favorite products.
- **Email Notifications**: Get notified instantly when a product's price drops below the initial value.
- **Web Scraping**: Scrape product prices and images directly from URLs using Puppeteer and Tesseract.js.
- **User-Friendly Interface**: Intuitive and responsive design powered by React.js.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Web Scraping**: Puppeteer and Tesseract.js
- **Notifications**: Resend for email alerts
- **Image Storage**: Cloudinary

---

## Installation

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v16 or later)
- MongoDB
- Yarn or npm

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/salescout.git
   cd salescout
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and provide the following details:

   ```env
   PORT=8000
   NODE_ENV=development
   MONGO_URI=your_mongo_database_uri
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   RESEND_API_KEY=your_resend_api_key
   EMAIL_SENDER=your_email_sender
   CLIENT_URL=your_client_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

5. Access the app in your browser:

   ```
   http://localhost:8000
   ```

---

## Usage

1. Sign up or log in to your Salescout account.
2. Add a product URL that you want to track.
3. Salescout will scrape the price and image of the product.
4. Receive email notifications when the price drops below the initial value.

---

## How It Works

1. **Scraping**: The backend uses Puppeteer to scrape the product's price and Tesseract.js for image extraction.
2. **Storage**: MongoDB stores the product information, user data, and price history.
3. **Notifications**: Resend sends email alerts to users when the price drops.
4. **Frontend**: React.js provides an interactive interface for managing tracked products.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful message"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- **Puppeteer** for enabling seamless web scraping.
- **Tesseract.js** for OCR image processing.
- **Resend** for efficient email notifications.
- **Cloudinary** for reliable image storage.

---

## Contact

For any inquiries, feel free to reach out to [your-email@example.com](mailto:your-email@example.com).
