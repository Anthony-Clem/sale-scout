export const getWelcomeEmailTemplate = () => ({
  subject: "Welcome to PriceTrack!",
  text: `Thank you for signing up. We're excited to help you track product prices effortlessly.`,
  html: `
    <!doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <title>Welcome Email</title>
      <meta name="description" content="Welcome Email Template.">
      <style type="text/css">a:hover{text-decoration:underline!important}</style>
    </head>
    <body style="margin: 0px; background-color: #f2f3f8;">
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: #ffffff; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:20px; text-align:center;">
                  <h1 style="color:#b91c1c;">Welcome to PriceTrack!</h1>
                  <p>Thank you for signing up. We're excited to help you track product prices effortlessly.</p>
                  <p>Start adding products and never miss a price drop!</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
});

export const getProductTrackingTemplate = (
  productName: string,
  productUrl: string
) => ({
  subject: `You're Tracking ${productName}!`,
  text: `You're now tracking the price for ${productName}. We'll notify you when the price drops below your initial tracked price. View the product here: ${productUrl}`,
  html: `
    <!doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <title>Product Tracking Email</title>
      <meta name="description" content="Product Tracking Email Template.">
      <style type="text/css">a:hover{text-decoration:underline!important}</style>
    </head>
    <body style="margin: 0px; background-color: #f2f3f8;">
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: #ffffff; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:20px; text-align:center;">
                  <h1 style="color:#b91c1c;">Product Tracking Started!</h1>
                  <p>You're now tracking the price for <strong>${productName}</strong>.</p>
                  <p>We'll notify you when the price drops below your initial tracked price.</p>
                  <p><a href="${productUrl}" style="color: #b91c1c; text-decoration: none;">View Product</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
});

export const getPriceDropTemplate = (
  productName: string,
  productUrl: string,
  currentPrice: string
) => ({
  subject: `Price Drop Alert: ${productName}`,
  text: `The price for ${productName} has dropped to $${currentPrice}. View the product here: ${productUrl}`,
  html: `
    <!doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <title>Price Drop Email</title>
      <meta name="description" content="Price Drop Email Template.">
      <style type="text/css">a:hover{text-decoration:underline!important}</style>
    </head>
    <body style="margin: 0px; background-color: #f2f3f8;">
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: #ffffff; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:20px; text-align:center;">
                  <h1 style="color:#b91c1c;">Price Drop Alert!</h1>
                  <p>The price for <strong>${productName}</strong> has dropped below your tracked price!</p>
                  <p>The current price is now <strong>$${currentPrice}</strong>.</p>
                  <p><a href="${productUrl}" style="color: #b91c1c; text-decoration: none;">View Product</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
});
