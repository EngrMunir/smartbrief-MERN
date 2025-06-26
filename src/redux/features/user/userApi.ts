import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSummaries: builder.query({
      query: () => ({
        url: "/summary/history",
        method: "GET",
      }),
    }),
    generateSummary: builder.mutation({
        query: ({ originalText, prompt }) => ({
        url: "/summary/generate",
        method: "POST",
        body: { originalText, prompt },
     }),
    }),
    deleteSummary: builder.mutation({
      query: (id) => ({
        url: `/summary/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
    useGetUserSummariesQuery, 
    useDeleteSummaryMutation,
    useGenerateSummaryMutation
 } = userApi;
