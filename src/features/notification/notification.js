import { baseApi } from "../../apiBaseQuery";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessOwnerNotification: builder.query({
      query: () => "/notifications/business-owner",
      providesTags: ["notifications"],
    }),


    getHRNotification: builder.query({
      query: () => "/notifications/hr-department-manager",
      providesTags: ["notifications"],

    }),


    readBusinessOwnerAllNotification: builder.mutation({
      query: () => ({
        url: `/notifications/business-owner`,
        method: 'PATCH',
      }),
      invalidatesTags: ['notifications'],
    }),

    readHRAllNotification: builder.mutation({
      query: () => ({
        url: `/notifications/hr-department-manager`,
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

    deleteSingleNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notifications'],
    }),

  }),
});

export const {
  useDeleteAllNotificationMutation,
  useDeleteSingleNotificationMutation,
  useGetBusinessOwnerNotificationQuery,
  useGetHRNotificationQuery,
  useReadBusinessOwnerAllNotificationMutation,
  useReadHRAllNotificationMutation
} = notificationApi;
