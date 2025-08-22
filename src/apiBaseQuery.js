import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./utils/BaseURL";
import { getToken } from "./utils/storage";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "overview",
    "instituteManagement",
    "employeeManagement",
    "location",
    "shiftManagement",
    "designation",
    "holidayManagement",
    "loginManagement",
    "subscription",
    "contact",
    "settings",
    "rules",
    "shiftAndLeave",
    "plan",
    "notifications"
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/api/v1`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
