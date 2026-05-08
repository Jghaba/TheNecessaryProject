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
    triggerSync: builder.mutation({
      query: () => ({ url: `${ANALYTICS_URL}/sync`, method: "POST" }),
    }),
  }),
});

export const {
  useGetAnalyticsSummaryQuery,
  useCreateCampaignMutation,
  useTriggerSyncMutation,
} = analyticsApiSlice;
