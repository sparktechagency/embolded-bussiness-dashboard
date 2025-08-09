import { baseApi } from "../../apiBaseQuery";


export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/departments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['institueManagement'],
    }),

    getAllDepartment: builder.query({
      query: (page) => ({
        url: "/departments",
        method: "GET",
      }),
      providesTags: ["institueManagement"]
    }),

    getDepartmentById: builder.query({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "GET",
      }),
      providesTags: ["institueManagement"]
    }),

    updateDepartment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/departments/${id}`,
        method: "PATCH",
        body: data, // {"departmentName": "Operations"}

      }),
      invalidatesTags: ['institueManagement'],
    }),

    updateDepartmentStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/departments/${id}`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["institueManagement"]
    }),

    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['institueManagement'],
    }),
  }),
});


export const {
  useCreateDepartmentMutation,
  useGetAllDepartmentQuery,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
  useUpdateDepartmentStatusMutation,
  useDeleteDepartmentMutation
} = departmentApi;