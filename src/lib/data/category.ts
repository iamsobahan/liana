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

export const getAllCategoriesData = async (): Promise<ApiResponse<ICategory[]>> => {
  const res = await fetch(`${config.API_URL}/api/v1/categories/all`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

export const getFeaturedCategories = async (): Promise<ApiResponse<ICategory[]>> => {
  const res = await fetch(`${config.API_URL}/api/v1/categories?isFeatured=true`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
}

export const getAllCategories = async (): Promise<
  ApiResponse<ICategory[]>
> => {
  const res = await fetch(
    `${config.API_URL}/api/v1/categories?page=1&limit=100`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return data;
};

export const getSingleCategory = async (slug: string): Promise<ApiResponse<ICategory> | null> => {
  const res = await fetch(`${config.API_URL}/api/v1/categories/${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};
