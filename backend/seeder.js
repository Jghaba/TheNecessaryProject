import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import Order from "./models/OderModel.js";
import Analytics from "./models/AnalyticsModel.js";
import SiteMetrics from "./models/SiteMetricsModel.js";
import DirectTrafficLog from "./models/DirectTrafficLogModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Analytics.deleteMany();
    await SiteMetrics.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    const sergiuUser = createdUsers[2]._id; // sergiu@thenecessary.com
    const raresUser = createdUsers[3]._id;  // rares@thenecessary.com

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    const createdProducts = await Product.insertMany(sampleProducts);

    // ── Analytics ─────────────────────────────────────────────────────────────
    // products[0] = Oversized T-Shirt €29.99
    // products[1] = Hoodie €59.99
    // products[2] = Sweatpants €39.99
    // products[3] = Denim Jacket €89.99

    const analyticsData = [
      {
        source: "Instagram",
        niche: "Streetwear",
        contentStyle: "Street Style",
        postId: "DYICK-Tz0vL",
        product: createdProducts[0]._id,
        clicks: 847,
        conversions: 23,
        totalRevenue: 689.77,
        cost: 150,
        views: 12400,
        likes: 934,
        shares: 61,
        saved: 278,
        commentCount: 43,
      },
      {
        source: "TikTok",
        niche: "Streetwear",
        contentStyle: "Lifestyle",
        product: createdProducts[1]._id,
        clicks: 1542,
        conversions: 19,
        totalRevenue: 1139.81,
        cost: 200,
        views: 38700,
        likes: 2103,
        shares: 185,
        saved: 412,
        commentCount: 97,
      },
      {
        source: "YouTube",
        niche: "Sustainable Fashion",
        contentStyle: "Product Showcase",
        product: createdProducts[3]._id,
        clicks: 389,
        conversions: 27,
        totalRevenue: 2429.73,
        cost: 350,
        views: 5800,
        likes: 312,
        shares: 29,
        saved: 88,
        commentCount: 54,
      },
      {
        source: "Facebook",
        niche: "Comfort Fashion",
        contentStyle: "Product Showcase",
        product: createdProducts[2]._id,
        clicks: 312,
        conversions: 11,
        totalRevenue: 439.89,
        cost: 120,
        views: 4100,
        likes: 178,
        shares: 22,
        saved: 45,
        commentCount: 18,
      },
    ];

    await Analytics.insertMany(analyticsData);

    // ── Orders ────────────────────────────────────────────────────────────────
    const shippingRo = {
      address: "Str. Victoriei 12",
      city: "Bucharest",
      postalCode: "010073",
      country: "Romania",
    };
    const shippingCluj = {
      address: "Calea Turzii 45",
      city: "Cluj-Napoca",
      postalCode: "400193",
      country: "Romania",
    };

    const ordersData = [
      // Sergiu — paid & delivered
      {
        user: sergiuUser,
        orderItems: [
          {
            name: createdProducts[0].name,
            qty: 2,
            image: createdProducts[0].image,
            price: 29.99,
            product: createdProducts[0]._id,
          },
          {
            name: createdProducts[2].name,
            qty: 1,
            image: createdProducts[2].image,
            price: 39.99,
            product: createdProducts[2]._id,
          },
        ],
        shippingAddress: shippingRo,
        paymentMethod: "PayPal",
        paymentResult: {
          id: "PAYID-SEED001",
          status: "COMPLETED",
          update_time: "2026-04-10T14:22:00Z",
          email_address: "sergiu@thenecessary.com",
        },
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 99.97,
        isPaid: true,
        paidAt: new Date("2026-04-10"),
        isDelivered: true,
        deliveredAt: new Date("2026-04-14"),
      },
      // Sergiu — paid, not delivered
      {
        user: sergiuUser,
        orderItems: [
          {
            name: createdProducts[3].name,
            qty: 1,
            image: createdProducts[3].image,
            price: 89.99,
            product: createdProducts[3]._id,
          },
        ],
        shippingAddress: shippingRo,
        paymentMethod: "PayPal",
        paymentResult: {
          id: "PAYID-SEED002",
          status: "COMPLETED",
          update_time: "2026-04-28T09:10:00Z",
          email_address: "sergiu@thenecessary.com",
        },
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 89.99,
        isPaid: true,
        paidAt: new Date("2026-04-28"),
        isDelivered: false,
      },
      // Sergiu — unpaid (cart abandoned)
      {
        user: sergiuUser,
        orderItems: [
          {
            name: createdProducts[1].name,
            qty: 1,
            image: createdProducts[1].image,
            price: 59.99,
            product: createdProducts[1]._id,
          },
        ],
        shippingAddress: shippingRo,
        paymentMethod: "PayPal",
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 59.99,
        isPaid: false,
        isDelivered: false,
      },
      // Rares — paid & delivered
      {
        user: raresUser,
        orderItems: [
          {
            name: createdProducts[1].name,
            qty: 1,
            image: createdProducts[1].image,
            price: 59.99,
            product: createdProducts[1]._id,
          },
          {
            name: createdProducts[4].name,
            qty: 1,
            image: createdProducts[4].image,
            price: 49.99,
            product: createdProducts[4]._id,
          },
        ],
        shippingAddress: shippingCluj,
        paymentMethod: "PayPal",
        paymentResult: {
          id: "PAYID-SEED003",
          status: "COMPLETED",
          update_time: "2026-04-15T11:45:00Z",
          email_address: "rares@thenecessary.com",
        },
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 109.98,
        isPaid: true,
        paidAt: new Date("2026-04-15"),
        isDelivered: true,
        deliveredAt: new Date("2026-04-19"),
      },
      // Rares — paid, not delivered
      {
        user: raresUser,
        orderItems: [
          {
            name: createdProducts[11].name,
            qty: 1,
            image: createdProducts[11].image,
            price: 79.99,
            product: createdProducts[11]._id,
          },
        ],
        shippingAddress: shippingCluj,
        paymentMethod: "PayPal",
        paymentResult: {
          id: "PAYID-SEED004",
          status: "COMPLETED",
          update_time: "2026-05-02T16:30:00Z",
          email_address: "rares@thenecessary.com",
        },
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 79.99,
        isPaid: true,
        paidAt: new Date("2026-05-02"),
        isDelivered: false,
      },
      // Rares — unpaid
      {
        user: raresUser,
        orderItems: [
          {
            name: createdProducts[0].name,
            qty: 1,
            image: createdProducts[0].image,
            price: 29.99,
            product: createdProducts[0]._id,
          },
          {
            name: createdProducts[5].name,
            qty: 2,
            image: createdProducts[5].image,
            price: 19.99,
            product: createdProducts[5]._id,
          },
        ],
        shippingAddress: shippingCluj,
        paymentMethod: "PayPal",
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 69.97,
        isPaid: false,
        isDelivered: false,
      },
    ];

    await Order.insertMany(ordersData);

    // ── SiteMetrics ───────────────────────────────────────────────────────────
    await SiteMetrics.create({
      _id: "global",
      directVisits: 184,
      directConversions: 12,
      directRevenue: 647.32,
    });

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Analytics.deleteMany();
    await SiteMetrics.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const resetAnalytics = async () => {
  try {
    await Analytics.deleteMany();
    await SiteMetrics.deleteMany();
    await DirectTrafficLog.deleteMany();
    console.log("Analytics Data Reset! (Users/Products/Orders untouched)".yellow.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else if (process.argv[2] === "-r") {
  resetAnalytics();
} else {
  importData();
}
