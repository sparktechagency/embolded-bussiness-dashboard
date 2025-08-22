import { baseApi } from "../../apiBaseQuery";


export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckOut: builder.mutation({
      query: (data) => ({
        url: "/subscriptions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['plan'],
    }),

    createAccount: builder.mutation({
      query: ({ token }) => {
        return {
          url: "/subscriptions/create-customer-account",
          method: "POST",
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        };
      },
    }),

    getAllPlan: builder.query({
      query: () => ({
        url: `/packages`,
        method: "GET",
      }),
      providesTags: ["plan"]
    }),


    subscriptionRemaining: builder.query({
      query: () => ({
        url: `/subscriptions/remaining`,
        method: "GET",
      }),
      providesTags: ["plan"]
    }),



  }),
});


export const {
  useCreateCheckOutMutation,
  useGetAllPlanQuery,
  useCreateAccountMutation,
  useSubscriptionRemainingQuery
} = planApi;