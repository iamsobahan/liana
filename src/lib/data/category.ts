import config from "@/config";
import { ApiResponse } from "@/types/api";
import { ICategory } from "@/types/category";

export const getCategories = async (): Promise<ApiResponse<ICategory[]>> => {
    const res = await fetch(`${config.API_URL}/api/v1/categories`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}

export const getFeaturedCategories = async (): Promise<ApiResponse<ICategory[]>> => {
    const res = await fetch(`${config.API_URL}/api/v1/categories?isFeatured=true`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}
