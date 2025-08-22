import { baseApi } from "../../apiBaseQuery";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/users/create-employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['employeeManagement'],
    }),

    getAllEmployee: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/employees?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["employeeManagement"],
    }),

    getEmployeeById: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: 'employeeManagement', id },
        'employeeManagement'
      ]
    }),

    updateEmployee: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'employeeManagement', id },
        'employeeManagement'
      ],
    }),

    updateEmplyeeStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employees/${id}/status`,
        method: "PATCH",
        body: data,  // {"status": "ACTIVE"}
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'employeeManagement', id },
        'employeeManagement'
      ]
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['employeeManagement'],
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