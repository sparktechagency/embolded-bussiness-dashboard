import { baseApi } from "../../apiBaseQuery";


export const instituteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createInstitue: builder.mutation({
      query: (data) => ({
        url: "/institutions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['institueManagement'],
    }),

    getAllInstitutions: builder.query({
      query: (page) => ({
        url: `/institutions?page=${page || 1}`,
        method: "GET",
      }),
      providesTags: ["institueManagement"]
    }),

    getInstitutionsById: builder.query({
      query: (id) => ({
        url: `/institutions/${id}`,
        method: "GET",
      }),
      providesTags: ["institueManagement"]
    }),

    updateInstitue: builder.mutation({
      query: ({ data, id }) => ({
        url: `/institutions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['institueManagement'],
    }),

    updateInstitueStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/institutions/${id}`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["institueManagement"]
    }),

    deleteInstitue: builder.mutation({
      query: (id) => ({
        url: `/institutions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['institueManagement'],
    }),
  }),
});


export const {
  useCreateInstitueMutation,
  useGetAllInstitutionsQuery,
  useGetInstitutionsByIdQuery,
  useUpdateInstitueMutation,
  useUpdateInstitueStatusMutation,
  useDeleteInstitueMutation
} = instituteApi;