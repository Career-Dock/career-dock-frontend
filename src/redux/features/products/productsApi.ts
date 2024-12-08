import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: `/products`,
        method: "POST",
        body: productData
      }),
      invalidatesTags: ["products"]
    }),
    getAllProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["products"]
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"]
    }),
    getMyProducts: builder.query({
      query: () => ({
        url: "/products/my-products",
        method: "GET"
      }),
      providesTags: ["products"]
    }),
    getProductsToMe: builder.query({
      query: () => ({
        url: "/products/products-to-me",
        method: "GET",
      }),
      providesTags: ["products"]
    }),
    updateProduct: builder.mutation({
      query: ({ id, statusData }: { id: string | undefined, statusData: { requestStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED' } }) => ({
        url: `/products/${id}/update-status`,
        method: "PATCH",
        body: statusData
      }),
      invalidatesTags: ["products"]
    }),
  }),
});

export const { useAddProductMutation, useGetSingleProductQuery, useGetMyProductsQuery, useGetProductsToMeQuery, useGetAllProductsQuery, useUpdateProductMutation } = productsApi;
