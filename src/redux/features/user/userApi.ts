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

    deleteMySummary: builder.mutation({
      query: (id) => ({
        url: `/summary/${id}`,
        method: "DELETE",
      }),
    }),

    repromptSummary: builder.mutation({
      query: ({ id, prompt }) => ({
        url: `/summary/reprompt/${id}`,
        method: "POST",
        body: { prompt },
      }),
    }),
    getMyProfile: builder.query({
        query: () => ({
        url: '/user/my-profile',
        method: 'GET',
        }),
    }),

    generateSummaryFromFile: builder.mutation({
  query: (formData) => ({
    url: '/summary/upload',
    method: 'POST',
    body: formData,
  }),
}),


  }),
});

export const { 
  useGetUserSummariesQuery, 
  useGenerateSummaryMutation,
  useDeleteMySummaryMutation,
  useRepromptSummaryMutation,
  useGetMyProfileQuery ,
  useGenerateSummaryFromFileMutation
} = userApi;
