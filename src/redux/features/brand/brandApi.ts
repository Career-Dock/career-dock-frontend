import { baseApi } from "../../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: (params) => ({
        url: "/product-brands",
        method: "GET",
        params,
      }),
      providesTags: ["brand"]
    }),
    //not works for now
    getMyBrands: builder.query({
      query: () => ({
        url: "/product-brands/my-brands",
        method: "GET"
      }),
      providesTags: ["brand"]
    }),
    getBrandsToMe: builder.query({
      query: () => ({
        url: "/product-brands/product-brands-to-me",
        method: "GET",
      }),
      providesTags: ["brand"]
    }),
    addBrand: builder.mutation({
      query: (brandsData) => ({
        url: `/product-brands`,
        method: "POST",
        body: brandsData
      }),
      invalidatesTags: ["brand"]
    }),
  }),
});

export const { useAddBrandMutation, useGetMyBrandsQuery, useGetBrandsToMeQuery, useGetAllBrandsQuery } = brandApi;
