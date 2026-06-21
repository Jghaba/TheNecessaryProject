import Analytics from "../models/AnalyticsModel.js";

const BASE_URL = "https://graph.facebook.com/v19.0";

function extractShortcode(permalink) {
  const match = permalink?.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

async function fetchInstagramMedia() {
  const { INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN } = process.env;
  // Include like_count and comments_count as basic fields — no insights permission needed
  let url = `${BASE_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,media_type,timestamp,permalink,like_count,comments_count&limit=100&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const allMedia = [];

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw new Error(`Instagram API: ${data.error.message}`);
    allMedia.push(...(data.data || []));
    url = data.paging?.next || null;
  }

  return allMedia;
}

async function fetchMediaInsights(mediaId, mediaType) {
  const { INSTAGRAM_ACCESS_TOKEN } = process.env;

  const metrics =
    mediaType === "VIDEO"
      ? "views,reach,saved,shares,likes,comments"
      : "impressions,reach,saved,likes,comments,shares";

  const url = `${BASE_URL}/${mediaId}/insights?metric=${metrics}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    console.log(`[Instagram Scraper] Insights error for ${mediaId}: ${data.error.message}`);
    return null;
  }

  const result = {};
  data.data?.forEach((metric) => {
    result[metric.name] = metric.values?.[0]?.value ?? metric.value ?? 0;
  });
  return result;
}

export async function syncInstagramMetrics() {
  console.log("[Instagram Scraper] Starting sync...");

  const mediaList = await fetchInstagramMedia();
  console.log(`[Instagram Scraper] Fetched ${mediaList.length} posts from Instagram`);

  const instagramShortcodes = mediaList.map((m) => extractShortcode(m.permalink)).filter(Boolean);
  console.log("[Instagram Scraper] Shortcodes from API:", instagramShortcodes);

  const dbPostIds = (await Analytics.find({ postId: { $ne: null, $ne: "" } }, "postId")).map((a) => a.postId);
  console.log("[Instagram Scraper] PostIds in DB:", dbPostIds);

  let updated = 0;
  let notFound = 0;

  for (const media of mediaList) {
    const shortcode = extractShortcode(media.permalink);
    if (!shortcode) continue;

    // Try insights for richer metrics; fall back to basic fields if unavailable
    const insights = await fetchMediaInsights(media.id, media.media_type);

    const updateData = {
      likes: insights?.likes ?? media.like_count ?? 0,
      commentCount: insights?.comments ?? media.comments_count ?? 0,
      views: insights?.views ?? insights?.impressions ?? 0,
      shares: insights?.shares ?? 0,
      saved: insights?.saved ?? 0,
    };

    const result = await Analytics.findOneAndUpdate(
      { postId: shortcode },
      updateData,
      { new: true }
    );

    if (result) {
      updated++;
    } else {
      notFound++;
    }
  }

  console.log(`[Instagram Scraper] Done. Updated: ${updated}, No match: ${notFound}, Total: ${mediaList.length}`);
  return { updated, notFound, total: mediaList.length, dbPostIds, instagramShortcodes };
}
