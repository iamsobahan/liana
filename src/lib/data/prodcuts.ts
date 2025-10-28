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

export const fetchAllProducts = async (queryParams: Record<string, string | number> = {}): Promise<ApiResponse<IProduct[]>> => {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            query.append(key, value.toString());
        }
    });
    const res = await fetch(`${config.API_URL}/api/v1/products?isPublished=true&${query.toString()}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}

export const fetchProductsByCategory = async (categorySlug: string, queryParams: Record<string, string | number> = {}): Promise<ApiResponse<IProduct[]>> => {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            query.append(key, value.toString());
        }
    });
    const res = await fetch(`${config.API_URL}/api/v1/products/category/${categorySlug}?${query.toString()}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}
