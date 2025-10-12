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
    boxs?: { box: Box, quantity: number, price: number, id: string }[];
    size?: Size[];
    thumbnail: string;
    regularPrice: number;
    salePrice: number;
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
    box: string;
    quantity: number;
    price: number;
    id: string;
};
export type Size = {
    name: string;
    price: number;
    id: string;
    quantity: number;
};