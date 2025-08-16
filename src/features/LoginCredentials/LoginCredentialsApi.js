import { baseApi } from "../../apiBaseQuery";


export const CredentialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCredentials: builder.mutation({
      query: (data) => ({
        url: "/users/register-role",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['LoginManagement'],
    }),

    getAllCredentials: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/users/sub-user/?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["LoginManagement"]
    }),

    getPerticularCredentials: builder.query({
      query: (id) => ({
        url: `/users/sub-user/${id}`,
        method: "GET",
      }),
      providesTags: ["LoginManagement"]
    }),

    updateCredentials: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/sub-user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['LoginManagement'],
    }),

    updateCredentialStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/sub-user/${id}`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["LoginManagement"]
    }),

    deleteCredentials: builder.mutation({
      query: (id) => ({
        url: `/users/sub-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['LoginManagement'],
    }),
  }),
});


export const {
  useCreateCredentialsMutation,
  useDeleteCredentialsMutation,
  useGetAllCredentialsQuery,
  useUpdateCredentialsMutation,
  useUpdateCredentialStatusMutation,
  useGetPerticularCredentialsQuery
} = CredentialsApi;