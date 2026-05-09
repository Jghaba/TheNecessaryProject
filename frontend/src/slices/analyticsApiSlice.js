import { apiSlice } from "./apiSlice";
import { ANALYTICS_URL } from "../constants";

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsSummary: builder.query({
      query: () => ({ url: ANALYTICS_URL }),
      keepUnusedDataFor: 30,
    }),
    createCampaign: builder.mutation({
      query: (data) => ({ url: ANALYTICS_URL, method: "POST", body: data }),
    }),
    generateContent: builder.mutation({
      query: (data) => ({ url: `${ANALYTICS_URL}/generate`, method: "POST", body: data }),
    }),
    linkPost: builder.mutation({
      query: ({ campaignId, postUrl }) => ({
        url: `${ANALYTICS_URL}/${campaignId}/post`,
        method: "PUT",
        body: { postUrl },
      }),
    }),
    triggerSync: builder.mutation({
      query: () => ({ url: `${ANALYTICS_URL}/sync`, method: "POST" }),
    }),
  }),
});

export const {
  useGetAnalyticsSummaryQuery,
  useCreateCampaignMutation,
  useGenerateContentMutation,
  useLinkPostMutation,
  useTriggerSyncMutation,
} = analyticsApiSlice;
