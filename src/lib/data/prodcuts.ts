import config from "@/config";
import { ApiResponse } from "@/types/api";
import { IProduct, ISingleProduct } from "@/types/product";

export const fetchHomeProducts = async () => {
    const res = await fetch(`${config.API_URL}/api/v1/products/home`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}

export const getSingleProduct = async (slug: string): Promise<ApiResponse<ISingleProduct<IProduct>>> => {
    const res = await fetch(`${config.API_URL}/api/v1/products/frontend/${slug}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}

export const fetchAllProducts = async (page: number, limit: number): Promise<ApiResponse<IProduct[]>> => {
    const res = await fetch(`${config.API_URL}/api/v1/products?isPublished=false&page=${page}&limit=${limit}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}

export const fetchProductsByCategory = async (categorySlug: string, page: number = 1, limit: number = 10): Promise<ApiResponse<IProduct[]>> => {
    const res = await fetch(`${config.API_URL}/api/v1/products/category/${categorySlug}?page=${page}&limit=${limit}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}
