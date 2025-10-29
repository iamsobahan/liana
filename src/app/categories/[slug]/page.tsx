import CategoryFilter from "@/components/Category/filter";
import { fetchProductsByCategory } from "@/lib/data/prodcuts";
import ProductCard from "@/components/card";
import {
  getAllCategories,
  getAllCategoriesData,
  getSingleCategory,
} from "@/lib/data/category";
import config from "@/config";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Cart from "@/components/Cart";
import Pagination from "@/components/pagination";
import Sort from "@/components/sorting/sort";
import CategoryFilterSidebar from "@/components/sorting/categories";

// Correct Props type
type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
};

export async function generateStaticParams() {
  const categories = await getAllCategoriesData();

  return categories.data.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = await getSingleCategory(slug);
  if (!category) {
    return {};
  }

  return {
    title: category.data.metaTitle || category.data.name,
    description: category.data.metaDescription || category.data.name,
    openGraph: {
      images: [
        {
          url: `${config.API_URL}/images/category/${category.data.image}`,
        },
      ],
    },
  };
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const pageNum = parseInt(((await searchParams)?.page as string) || "1", 10);
  const sortyBy = ((await searchParams)?.sortBy as string) || "createdAt";
  const sortOrder =
    ((await searchParams)?.sortOrder as "asc" | "desc") || "desc";
  const limitNum = parseInt(
    ((await searchParams)?.limit as string) || "50",
    10
  );

  const products = await fetchProductsByCategory(slug, {
    page: pageNum,
    limit: limitNum,
    sortBy: sortyBy,
    sortOrder: sortOrder,
  });

  if (products.success === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-3xl font-semibold mb-4">Product not found</h1>
        <p className="text-gray-500 mb-6">
          The product you are looking for does not exist or may have been
          removed.
        </p>
        <Link
          href="/"
          className="px-5 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-400S transition"
        >
          Back to Home Page
        </Link>
      </div>
    );
  }

  const allCategories = await getAllCategories();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-2 md:py-4 text-gray-800">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTER SIDEBAR (desktop) */}
          <CategoryFilterSidebar categories={allCategories.data} />
          <Cart />
          <CategoryFilter categories={allCategories.data} />

          {/* PRODUCT GRID */}
          <main className="lg:col-span-3">
            {/* Sort Bar */}
            <Sort />

            {/* Grid */}
            <div className="grid gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {products?.data?.map((product, idx) => (
                <ProductCard key={idx} item={product} />
              ))}
            </div>
            <Pagination total={products?.meta?.total || 0} limit={limitNum} />
          </main>
        </div>
      </div>
    </div>
  );
}
