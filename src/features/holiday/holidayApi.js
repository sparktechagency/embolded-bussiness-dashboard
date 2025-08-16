import { baseApi } from '../../apiBaseQuery';



export const holidayApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHoliday: builder.mutation({
      query: (data) => ({
        url: "/holidays",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['holidayManagement'],
    }),

    getAllHoliday: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/holidays?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["holidayManagement"]
    }),

    getHolidayById: builder.query({
      query: (id) => ({
        url: `/holidays/${id}`,
        method: "GET",
      }),
      providesTags: ["holidayManagement"]
    }),

    updateHoliday: builder.mutation({
      query: ({ data, id }) => ({
        url: `/holidays/${id}`,
        method: "PATCH",
        body: data, // {"departmentName": "Operations"}

      }),
      invalidatesTags: ['holidayManagement'],
    }),

    updateDHolidayStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/holidays/${id}`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["holidayManagement"]
    }),

    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `/holidays/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['holidayManagement'],
    }),
  }),
});


export const {
  useCreateHolidayMutation,
  useGetAllHolidayQuery,
  useGetHolidayByIdQuery,
  useUpdateHolidayMutation,
  useUpdateDHolidayStatusMutation,
  useDeleteHolidayMutation
} = holidayApi;