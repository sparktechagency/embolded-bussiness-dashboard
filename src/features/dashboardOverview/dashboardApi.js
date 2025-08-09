import { baseApi } from "../../apiBaseQuery";

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbesnts: builder.query({
      query: () => "/analytics/absents",
      transformResponse: (response) => response?.data.reverse(),
      providesTags: ["overview"]
    }),

    getLates: builder.query({
      query: () => "/analytics/lates",
      transformResponse: (response) => response?.data.reverse(),
      providesTags: ["overview"]
    }),

    getAttendance: builder.query({
      query: () => "/analytics/present-summary/last-seven-days",
      providesTags: ["overview"]
    }),

    statisticsForBussiness: builder.query({
      query: () => "/analytics/summary/last-seven-days",
      transformResponse: (response) => response?.data,
      providesTags: ["overview"]
    }),

    statisticsForHrAndDep: builder.query({
      query: () => "/analytics/today-summary",
      transformResponse: (response) => response?.data,
      providesTags: ["overview"]
    }),

    summary: builder.query({
      query: () => "/analytics/summary",
      providesTags: ["overview"]
    }),


  }),
});

export const { useGetAbesntsQuery, useGetAttendanceQuery, useGetLatesQuery, useStatisticsForBussinessQuery, useStatisticsForHrAndDepQuery, useSummaryQuery } = overviewApi;
