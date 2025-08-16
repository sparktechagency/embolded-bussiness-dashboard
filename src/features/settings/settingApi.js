import { baseApi } from "../../apiBaseQuery";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["settings"]
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ['settings']
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
        // Don't set Content-Type header, let browser set it for FormData
      }),
      invalidatesTags: ["settings"]
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation
} = settingApi;