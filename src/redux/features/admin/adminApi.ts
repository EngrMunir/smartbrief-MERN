import { baseApi } from "../../api/baseApi";


const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
     updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: { role },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllSummaries: builder.query({
            query: () => ({
            url: '/summary',
            method: 'GET',
        }),
    }),

    deleteSummary: builder.mutation({
        query: (id) => ({
        url: `/summary/${id}`,
        method: 'DELETE',
        }),
    }),

    rechargeCredits: builder.mutation({
        query: ({ userId, amount }) => ({
        url: `/user/recharge-credits`,
        method: "POST",
        body: { userId, amount },
      }),
      invalidatesTags: ["Users"],
    }),

  }),
});



export const { 
    useGetAllUsersQuery, 
    useDeleteUserMutation, 
    useUpdateUserRoleMutation,
    useDeleteSummaryMutation,
    useGetAllSummariesQuery,
    useRechargeCreditsMutation

 } = adminApi;
