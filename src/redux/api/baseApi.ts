import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization", `${token}`);
        }
        return headers;
    }
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery,
    tagTypes: ["auth", "user", "products", "brand", "category", "subcategory"],
    endpoints: () => ({})
})