import cron from "node-cron";
import { syncInstagramMetrics } from "../utils/instagramScraper.js";

// Runs every 6 hours: 00:00, 06:00, 12:00, 18:00
cron.schedule("0 */6 * * *", async () => {
  console.log("[Cron] Instagram metrics sync triggered");
  try {
    const result = await syncInstagramMetrics();
    console.log("[Cron] Sync result:", result);
  } catch (err) {
    console.error("[Cron] Sync failed:", err.message);
  }
});

console.log("[Cron] Instagram metrics sync scheduled — runs every 6 hours");
