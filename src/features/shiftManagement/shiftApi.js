import { baseApi } from "../../apiBaseQuery";


export const shiftApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShift: builder.mutation({
      query: (data) => ({
        url: "/shifts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['shiftManagement'],
    }),

    getAllShift: builder.query({
      query: (page) => ({
        url: `/shifts?page=${page || 1}`,
        method: "GET",
      }),
      providesTags: ["shiftManagement"]
    }),

    getShiftById: builder.query({
      query: (id) => ({
        url: `/shifts/${id}`,
        method: "GET",
      }),
      providesTags: ["shiftManagement"]
    }),

    updateShift: builder.mutation({
      query: ({ data, id }) => ({
        url: `/shifts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['shiftManagement'],
    }),

    updateShiftStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/shifts/${id}/status`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["shiftManagement"]
    }),

    deleteShift: builder.mutation({
      query: (id) => ({
        url: `/shifts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['shiftManagement'],
    }),
  }),
});


export const {
  useCreateShiftMutation,
  useGetAllShiftQuery,
  useGetShiftByIdQuery,
  useUpdateShiftMutation,
  useUpdateShiftStatusMutation,
  useDeleteShiftMutation
} = shiftApi;