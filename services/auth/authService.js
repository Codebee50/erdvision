import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseBeUrl } from "@/urls/be";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseBeUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),

  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
