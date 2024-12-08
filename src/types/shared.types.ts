export type ChildrenProps = { children: React.ReactNode }

export type TBrand = {
    name: string;
    description: string;
    logo: string;
    website: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    __v: number;
}
export type TCategory = {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    __v: number;
}
export type TSubcategory = {
    name: string;
    description: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    __v: number;
}
// product related
export type TProductImage = {
    url: string;
    alt?: string;
}

export type TProductAttribute = {
    name: string;        // e.g., "Color", "Size"
    value?: string[];  // For select type attributes
}

export type TProductVariant = {
    // productId: Schema.Types.ObjectId | string;
    sku: string;
    attributes: TProductAttribute[]; // e.g., [{name: "color", value: "red"}, {value: "size", value: "XL"}]
    price: number;
    quantity: number;
    status: "in_stock" | "out_of_stock" | "pre_order";
    images: string[];
    isDefault: boolean;
}

export type TProduct = {
    _id: string;
    name: string;
    description: string;
    sku: string;
    category?: TCategory;
    subcategory?: TSubcategory;
    brand?: TBrand;
    companyId: string;
    variants: TProductVariant[];
    images: TProductImage[];
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    // metadata?: Record<string, string | number | boolean>;
    ratingsAverage?: number;
    ratingsCount?: number;
    tags?: string[];
    isFeatured?: boolean;
    isNewArrival?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

