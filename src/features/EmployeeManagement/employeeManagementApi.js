import { baseApi } from "../../apiBaseQuery";


export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/users/create-employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['empolyeeManagement'],
    }),

    getAllEmployee: builder.query({
      query: (page) => ({
        url: `/employees?page=${page || 1}`,
        method: "GET",
      }),
      providesTags: ["empolyeeManagement"]
    }),

    getEmployeeById: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
      providesTags: ["empolyeeManagement"]
    }),

    updateEmployee: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['empolyeeManagement'],
    }),

    updateEmplyeeStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employees/${id}/status`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: ["empolyeeManagement"]
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['empolyeeManagement'],
    }),
  }),
});


export const {
  useCreateEmployeeMutation,
  useGetAllEmployeeQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useUpdateEmplyeeStatusMutation,
  useDeleteEmployeeMutation
} = employeeApi;