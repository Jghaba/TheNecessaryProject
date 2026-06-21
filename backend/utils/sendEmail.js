import nodemailer from "nodemailer";

const sendOrderConfirmationEmail = async (order) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsRows = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.qty}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">€${Number(item.price).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#222;">
      <div style="background:#111;padding:24px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:2px;">THE NECESSARY</h1>
      </div>
      <div style="padding:32px 24px;">
        <h2 style="margin-top:0;">Order Confirmed ✓</h2>
        <p>Hello <strong>${order.user.name}</strong>,</p>
        <p>Thank you for your order! Payment has been received and your order is being processed.</p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:8px 12px;text-align:left;">Product</th>
              <th style="padding:8px 12px;text-align:center;">Qty</th>
              <th style="padding:8px 12px;text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>

        <table style="width:100%;margin-bottom:24px;">
          <tr><td>Shipping</td><td style="text-align:right;">€${Number(order.shippingPrice).toFixed(2)}</td></tr>
          <tr><td>Tax</td><td style="text-align:right;">€${Number(order.taxPrice).toFixed(2)}</td></tr>
          <tr style="font-weight:bold;font-size:16px;">
            <td>Total</td><td style="text-align:right;">€${Number(order.totalPrice).toFixed(2)}</td>
          </tr>
        </table>

        <div style="background:#f9f9f9;border-radius:8px;padding:16px;margin-bottom:24px;">
          <strong>Shipping to:</strong><br/>
          ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}
        </div>

        <p style="color:#666;font-size:13px;">Order ID: <code>${order._id}</code></p>
      </div>
      <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:12px;color:#999;">
        © ${new Date().getFullYear()} TheNecessary — Premium Menswear
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"TheNecessary" <${process.env.EMAIL_USER}>`,
    to: order.user.email,
    subject: `Order Confirmed — #${order._id}`,
    html,
  });
};

export default sendOrderConfirmationEmail;
