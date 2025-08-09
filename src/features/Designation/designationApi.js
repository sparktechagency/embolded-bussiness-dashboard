import { baseApi } from "../../apiBaseQuery";


export const designationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDesignation: builder.mutation({
      query: (data) => ({
        url: "/designations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['designation'],
    }),

    getAllDesignation: builder.query({
      query: (page) => ({
        url: `/designations?page=${page || 1}`,
        method: "GET",
      }),
      providesTags: ["designation"]
    }),

    getDesignationById: builder.query({
      query: (id) => ({
        url: `/designations/${id}`,
        method: "GET",
      }),
      providesTags: ["designation"]
    }),

    updateDesignation: builder.mutation({
      query: ({ data, id }) => ({
        url: `/designations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['designation'],
    }),

    updateDesignationStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/designations/${id}/status`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["designation"]
    }),

    deleteDesignation: builder.mutation({
      query: (id) => ({
        url: `/designations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['designation'],
    }),
  }),
});


export const {
  useCreateDesignationMutation,
  useGetAllDesignationQuery,
  useGetDesignationByIdQuery,
  useUpdateDesignationMutation,
  useUpdateDesignationStatusMutation,
  useDeleteDesignationMutation
} = designationApi;