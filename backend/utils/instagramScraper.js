import Analytics from "../models/AnalyticsModel.js";

const BASE_URL = "https://graph.facebook.com/v19.0";

function extractShortcode(permalink) {
  const match = permalink?.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

async function fetchInstagramMedia() {
  const { INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN } = process.env;
  const url = `${BASE_URL}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,media_type,timestamp,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) throw new Error(`Instagram API: ${data.error.message}`);
  return data.data || [];
}

async function fetchMediaInsights(mediaId, mediaType) {
  const { INSTAGRAM_ACCESS_TOKEN } = process.env;

  const metrics =
    mediaType === "VIDEO"
      ? "video_views,reach,likes,comments,shares,saved"
      : "impressions,reach,likes,comments,shares,saved";

  const url = `${BASE_URL}/${mediaId}/insights?metric=${metrics}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.error) return null;

  const result = {};
  data.data?.forEach((metric) => {
    result[metric.name] = metric.values?.[0]?.value ?? metric.value ?? 0;
  });
  return result;
}

export async function syncInstagramMetrics() {
  console.log("[Instagram Scraper] Starting sync...");

  const mediaList = await fetchInstagramMedia();
  let updated = 0;
  let notFound = 0;

  for (const media of mediaList) {
    const insights = await fetchMediaInsights(media.id, media.media_type);
    if (!insights) continue;

    const shortcode = extractShortcode(media.permalink);
    const result = await Analytics.findOneAndUpdate(
      { postId: shortcode },
      {
        views: insights.video_views ?? insights.impressions ?? 0,
        likes: insights.likes ?? 0,
        commentCount: insights.comments ?? 0,
        shares: insights.shares ?? 0,
        saved: insights.saved ?? 0,
      },
      { new: true }
    );

    result ? updated++ : notFound++;
  }

  console.log(
    `[Instagram Scraper] Done. Updated: ${updated}, No matching campaign: ${notFound}`
  );
  return { updated, notFound, total: mediaList.length };
}
