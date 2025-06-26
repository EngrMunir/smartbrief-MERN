import { baseApi } from "../../api/baseApi";

export const editorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSummaries: build.query({
      query: () => ({
        url: "/summary",
        method: "GET",
      }),
      providesTags: ["Summaries"],
    }),

    updateSummary: build.mutation({
      query: ({ id, summary }) => ({
        url: `/summary/${id}`,
        method: "PATCH",
        body: { summary },
      }),
      invalidatesTags: ["Summaries"],
    }),

    deleteSummary: build.mutation({
      query: (id) => ({
        url: `/summary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Summaries"],
    }),
  }),
});

export const {
  useGetAllSummariesQuery,
  useUpdateSummaryMutation,
  useDeleteSummaryMutation,
} = editorApi;
