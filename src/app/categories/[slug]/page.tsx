import CategoryFilter from "@/components/Category/filter";
import { fetchProductsByCategory } from "@/lib/data/prodcuts";
import { ChevronRight } from 'lucide-react';
import ProductCard from "@/components/card";
import { FilterContent } from "@/components/Category/content";
import { getAllCategoriesData, getSingleCategory } from "@/lib/data/category";
import config from "@/config";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Cart from "@/components/Cart";
import Pagination from "@/components/pagination";
import Sort from "@/components/sorting/sort";

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

// ------------------ Generate Static Params ------------------
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

// ------------------ Page Component ------------------
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
          className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          Back to Home Page
        </Link>
      </div>
    );
  }


  const category = await getAllCategoriesData();
  

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-2 md:py-4 text-gray-800">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTER SIDEBAR (desktop) */}
          <aside className="hidden lg:block bg-white shadow-md rounded-xl h-fit">
            <div className=" bg-white rounded-lg  shadow-sm">
              <div className="bg-yellow-500 text-white font-semibold text-lg p-3 rounded-t-lg">
                Categories
              </div>

              <div className="divide-y-gray-200">
                {category?.data?.map((cat) => (
                  <button
                    key={cat._id}
                    className="flex items-center justify-between w-full text-left p-3 cursor-pointer hover:bg-yellow-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                          {cat.name}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-500" />
                  </button>
                ))}
              </div>

              <button className="w-full py-2 text-md text-yellow-600 cursor-pointer  font-medium hover:underline">
                Clear All Filters
              </button>
            </div>
          </aside>
          <Cart />
          <CategoryFilter />

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
