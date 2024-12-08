"use client";
import useDataFetching from "@/hooks/useDataFetching";
import ProductsFilter from "@/my-components/products/all-products/ProductsFilter";
import SPopover from "@/my-components/shadcn-reusable/SPopover";
import {
  EllipsisVertical,
  Hammer,
  ShoppingCart,
  Tags,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductsPage = () => {
  // important hooks
  const router = useRouter();
  // local states start
  const [filters, setFilters] = useState({
    brandsQuery: undefined,
    categoryQuery: undefined,
    subCategoryQuery: undefined,
    productQuery: undefined,
  });
  // local states end
  // data fetching start
  const { products } = useDataFetching(filters);
  console.log({ products });
  return (
    <div className="p-8 border">
      {/* product page header  */}
      <div className="flex items-center justify-between">
        <div>Products</div>
        <div className="flex items-center gap-3">
          <ProductsFilter filters={filters} setFilters={setFilters} />
          <div
            onClick={() => router.push(`/dashboard/products/add-new-product`)}
            className="btn-primary uppercase"
          >
            Add New product
          </div>
        </div>
      </div>
      {/* product list */}
      <div>
        <div className="">
          <div className="flex justify-between items-center border-main rounded px-3 py-2 my-3 text-sm">
            <div className="grid grid-cols-12 w-full text-center">
              <div className="col-span-3 border-r">Name</div>
              <div className="col-span-2 border-r">Price</div>
              <div className="col-span-2 border-r">Brand</div>
              <div className="col-span-2 border-r">Category</div>
              <div className="col-span-2 border-r">Subcategory</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-main rounded">
          {products?.map((product, index) => (
            <div
              key={index}
              // className="px-3 py-2 text-xs border-b border-gray-300 hover:bg-sky-50">
              className={`px-3 py-2 text-xs ${
                products?.length - 1 !== index
                  ? "border-b border-gray-300"
                  : "rounded-b"
              } ${index === 0 ? "rounded-t" : ""} hover:bg-sky-50`}
            >
              <div className="grid grid-cols-12 text-center">
                <div className="col-span-3 border-r text-start fjiC !justify-start">
                  {product?.name}
                </div>
                <div className="col-span-2 border-r text-right fjiC !justify-end pr-2">
                  $ {product?.variants[0]?.price}
                </div>
                <div className="col-span-2 border-r fjiC">
                  {product?.brand?.name}
                </div>
                <div className="col-span-2 border-r fjiC">
                  {product?.category?.name}
                </div>
                <div className="col-span-2 border-r fjiC">
                  {product?.subcategory?.name}
                </div>
                <div className="col-span-1 fjiC">
                  <SPopover
                    key={product?._id}
                    triggerChildren={
                      <EllipsisVertical
                        size={16}
                        className="hover:bg-white border-main hover:border-sky-300 h-6 w-6 p-1 rounded-full"
                      />
                    }
                    contentChildren={
                      <Actions key={product?._id} id={product?._id} />
                    }
                    contentStyles="bg-white w-fit"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Actions = ({ id }: { id: string }) => {
  const styles = {
    item: "flex items-center gap-3 hover:text-sky-600 hover:cursor-pointer hover:underline",
  };
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <div onClick={() => router.push(`/dashboard/products/${id}`)} className={`${styles.item}`}>
        <ShoppingCart size={13} />
        <span className="text-xs">Product details</span>
      </div>
      <div className={`${styles.item}`}>
        <Tags size={13} />
        <span className="text-xs">Add new variant</span>
      </div>
      <div className={`${styles.item}`}>
        <Hammer size={13} />
        <span className="text-xs">Update product</span>
      </div>
      <div className={`${styles.item}`}>
        <Trash2 size={13} />
        <span className="text-xs">Delete product</span>
      </div>
    </div>
  );
};

export default ProductsPage;
