import { baseApi } from "../../apiBaseQuery";


export const shiftAndLeaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShiftAndLeave: builder.query({
      query: (page) => ({
        url: `/requests?page=${page || 1}`,
        method: "GET",
      }),
      providesTags: ["shiftAndLeave"]
    }),

    updateMultipulShiftAndLeave: builder.mutation({
      query: (data) => ({
        url: `/requests/bulk-update-status`,
        method: "PATCH",
        body: data
      }),
      providesTags: ["shiftAndLeave"]
    }),

    updateSingleShiftAndLeave: builder.mutation({
      query: ({ data, id }) => ({
        url: `/requests/${id}/status`,
        method: "PATCH",
        body: data
      }),
      providesTags: ["shiftAndLeave"]
    }),




  }),
});


export const {
  useGetAllShiftAndLeaveQuery,
  useUpdateMultipulShiftAndLeaveMutation,
  useUpdateSingleShiftAndLeaveMutation
} = shiftAndLeaveApi;