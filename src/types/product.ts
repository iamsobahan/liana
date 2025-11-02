export type ISingleProduct<T> = {
    product: T;
    relatedProducts: T[];
};

export type IProduct = {
    discount: {
        discountType: "percentage" | "fixed";
        discountValue: number;
    };
    _id: string;
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    sku: string;
    categories: { name: string; slug: string }[];
    galleryImages: string[];
    // boxes?: BoxItem[];
    box: Box;
    sizes?: Size[];
    boxTitle?: string;
    sizeTitle?: string;
    sizeGuide?: string;
    policy?: string;
    thumbnail: string;
    regularPrice: number;
    sellingPrice: number;
    flashPrice: number;
    stock: number;
    isInStock: boolean;
    isFeatured: boolean;
    isNewProduct: boolean;
    isFlashSale: boolean;
    isBestSelling: boolean;
    isPublished: boolean;
    purchaseQuantity: number;
    totalPurchased: number;
    sellsQuantity: number;
    totalSales: number;
    totalStock: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export type Box = {
    _id: string;
    name: string;
    image: string;
    sellingPrice: number;
    color: string;
    stock: number;
    id: string;
};
export type Size = {
    name: string;
    _id: string;
    price: number;
};
export type BoxItem = {
    box: Box;
    price: number;
    isSelected: boolean;
    _id: string;
    id: string;
};