import { baseApi } from "../../apiBaseQuery";


export const locationtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLocation: builder.mutation({
      query: (data) => ({
        url: "/locations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['location'],
    }),

    getAllLocation: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/locations?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["location"]
    }),

    getLocationById: builder.query({
      query: (id) => ({
        url: `/locations/${id}`,
        method: "GET",
      }),
      providesTags: ["location"]
    }),

    updateLocation: builder.mutation({
      query: ({ data, id }) => ({
        url: `/locations/${id}`,
        method: "PATCH",
        body: data, // {"departmentName": "Operations"}

      }),
      invalidatesTags: ['location'],
    }),

    updateLocationStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/locations/${id}`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["location"]
    }),

    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['location'],
    }),
  }),
});


export const {
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useGetAllLocationQuery,
  useGetLocationByIdQuery,
  useUpdateLocationMutation,
  useUpdateLocationStatusMutation
} = locationtApi;