import { baseApi } from "../../apiBaseQuery";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => "/notifications/business-owner",
      providesTags: ["notifications"],
    }),

    readAllNotification: builder.mutation({
      query: () => ({
        url: `/notifications`,
        method: 'PATCH',
      }),
      invalidatesTags: ['notifications'],
    }),

    deleteAllNotification: builder.mutation({
      query: () => ({
        url: `/notifications`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notifications'],
    }),

    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notifications'],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
  useDeleteAllNotificationMutation,
  useDeleteNotificationMutation
} = notificationApi;
