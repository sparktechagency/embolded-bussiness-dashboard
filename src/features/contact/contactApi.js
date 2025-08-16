import { baseApi } from "../../apiBaseQuery";


export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContacts: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['contact'],
    }),
  }),
});


export const {
  useCreateContactsMutation
} = contactApi;