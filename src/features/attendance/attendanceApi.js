import { baseApi } from "../../apiBaseQuery";


export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query({
      query: ({ id, month }) => ({
        url: `/attendances/user/${id}?month=${month}`,
        method: "GET",
      }),
      providesTags: ["empolyeeManagement"]
    }),
  }),
});


export const {
  useGetAttendanceQuery
} = attendanceApi;