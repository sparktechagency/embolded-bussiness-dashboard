import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./utils/BaseURL";
import { getToken } from "./utils/storage";

export const baseApi = createApi({
  tagTypes: ["overview", "institueManagement", "empolyeeManagement", "shiftManagement", "designation", "holidayManagement", "siftManagement", "LoginManagement", "subscription", "contact", "settings", "rules"],
  reducerPath: "baseApi",
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
