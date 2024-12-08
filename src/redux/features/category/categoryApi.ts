import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (params) => ({
        url: "/product-categories",
        method: "GET",
        params,
      }),
      providesTags: ["category"]
    }),
    //not works for now
    getMyCategories: builder.query({
      query: () => ({
        url: "/product-categories/my-category",
        method: "GET"
      }),
      providesTags: ["category"]
    }),
    getCategoriesToMe: builder.query({
      query: () => ({
        url: "/product-categories/product-categories-to-me",
        method: "GET",
      }),
      providesTags: ["category"]
    }),
    addCategory: builder.mutation({
      query: (categoryData) => ({
        url: `/product-categories`,
        method: "POST",
        body: categoryData
      }),
      invalidatesTags: ["category"]
    }),
  }),
});

export const { useAddCategoryMutation, useGetMyCategoriesQuery, useGetCategoriesToMeQuery, useGetAllCategoriesQuery } = categoryApi;
