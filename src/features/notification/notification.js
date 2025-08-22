import { baseApi } from "../../apiBaseQuery";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => "/notifications",
      providesTags: ["notifications"],
    }),
    readAllNotification: builder.mutation({
      query: () => ({
        url: `/notifications`,
        method: 'PATCH',
      }),
      invalidatesTags: ['notifications'],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useReadAllNotificationMutation
} = notificationApi;
