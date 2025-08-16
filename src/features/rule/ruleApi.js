import { baseApi } from "../../apiBaseQuery";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTerm: builder.mutation({
      query: (data) => ({
        url: "/rules/terms-and-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rules"]
    }),

    createPrivacy: builder.mutation({
      query: (data) => ({
        url: "/rules/privacy-policy",
        method: "POST",
        body: data,  /* {
    "content":"Create Term and conditions",
    "type":"terms"
} */
      }),
      invalidatesTags: ["rules"]
    }),

    createAbout: builder.mutation({
      query: (data) => ({
        url: "/rules/about",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rules"]
    }),

    getTerm: builder.query({
      query: () => ({
        url: "/rules/terms-and-conditions",
        method: "GET",
      }),
      providesTags: ['rules']
    }),


    getPrivacy: builder.query({
      query: () => ({
        url: "/rules/privacy-policy",
        method: "GET",
      }),
      providesTags: ['rules']
    }),

    getAbout: builder.query({
      query: () => ({
        url: "/rules/about",
        method: "GET",
      }),
      providesTags: ['rules']
    }),

  }),
});

export const {
  useCreateAboutMutation,
  useCreatePrivacyMutation,
  useCreateTermMutation,
  useGetAboutQuery,
  useGetPrivacyQuery,
  useGetTermQuery,
} = settingApi;