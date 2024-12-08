"use client"
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllProductsQuery, useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import { useGetAllSubcategoryQuery } from "@/redux/features/subcategory/subcategoryApi";
import { TBrand, TCategory, TProduct, TSubcategory } from "@/types";

interface DataFetchingResults {
    brands: TBrand[];
    categories: TCategory[];
    subcategories: TSubcategory[];
    products: TProduct[];
    singleProduct: TProduct;
    isBrandsLoading: boolean;
    isCategoriesLoading: boolean;
    isSubcategoriesLoading: boolean;
    isProductsLoading: boolean;
    isSingleProductLoading: boolean;
}

interface IDynamicQuery {
    brandsQuery?: string | object | undefined;
    categoryQuery?: string | object | undefined;
    subCategoryQuery?: string | object | undefined;
    productQuery?: string | object | undefined;
    productId?: string | undefined;
}

const useDataFetching = (dynamicQuery: IDynamicQuery = {}): DataFetchingResults => {
    // Fetch data for brands, categories, subcategories and products
    const { data: brandResponse, isLoading: isBrandsLoading } = useGetAllBrandsQuery(dynamicQuery.brandsQuery);
    const { data: categoryResponse, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery(dynamicQuery.categoryQuery);
    const { data: subcategoryResponse, isLoading: isSubcategoriesLoading } = useGetAllSubcategoryQuery(dynamicQuery.subCategoryQuery);
    const { data: productsResponse, isLoading: isProductsLoading } = useGetAllProductsQuery(dynamicQuery.productQuery);
    const { data: singleProductResponse, isLoading: isSingleProductLoading } = useGetSingleProductQuery(dynamicQuery.productId);

    // Transform the fetched data if needed (e.g., map to the expected types)
    const brandData: TBrand[] = brandResponse?.data || [];
    const categoryData: TCategory[] = categoryResponse?.data || [];
    const subcategoryData: TSubcategory[] = subcategoryResponse?.data || [];
    const productsData: TProduct[] = productsResponse?.data || [];
    const singleProduct: TProduct = singleProductResponse?.data || {};

    return {
        brands: brandData,
        categories: categoryData,
        subcategories: subcategoryData,
        products: productsData,
        singleProduct,
        isBrandsLoading,
        isCategoriesLoading,
        isSubcategoriesLoading,
        isProductsLoading,
        isSingleProductLoading
    };
};

export default useDataFetching;
