import { baseApi } from "../../api/baseApi";

const subcategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubcategory: builder.query({
      query: (params) => ({
        url: "/product-subcategories",
        method: "GET",
        params,
      }),
      providesTags: ["subcategory"]
    }),
    //not works for now
    getMySubcategory: builder.query({
      query: () => ({
        url: "/product-subcategories/my-brands",
        method: "GET"
      }),
      providesTags: ["subcategory"]
    }),
    getSubcategoryToMe: builder.query({
      query: () => ({
        url: "/product-subcategories/product-subcategories-to-me",
        method: "GET",
      }),
      providesTags: ["subcategory"]
    }),
    addSubcategory: builder.mutation({
      query: (brandsData) => ({
        url: `/product-subcategories`,
        method: "POST",
        body: brandsData
      }),
      invalidatesTags: ["subcategory"]
    }),
  }),
});

export const { useAddSubcategoryMutation, useGetMySubcategoryQuery, useGetSubcategoryToMeQuery, useGetAllSubcategoryQuery } = subcategoryApi;
