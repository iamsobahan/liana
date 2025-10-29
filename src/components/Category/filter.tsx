"use client";

import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ICategory } from "@/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface IProps {
  categories: ICategory[];
}

const CategoryFilter = ({ categories }: IProps) => {
  const [showFilter, setShowFilter] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    switch (selectedSort) {
      case "low-high":
        params.set("sortOrder", "asc");
        params.set("sortBy", "salePrice");
        break;
      case "high-low":
        params.set("sortOrder", "desc");
        params.set("sortBy", "salePrice");
        break;
      case "latest":
        params.set("sortOrder", "desc");
        params.set("sortBy", "createdAt");
        break;
      case "best-selling":
        params.set("sortOrder", "desc");
        params.set("sortBy", "sellsQuantity");
        break;
      case "default":
      default:
        params.delete("sortOrder");
        params.delete("sortBy");
        break;
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

  const currentSort =
    sortBy === "salePrice" && sortOrder === "asc"
      ? "low-high"
      : sortBy === "salePrice" && sortOrder === "desc"
      ? "high-low"
      : sortBy === "createdAt"
      ? "latest"
      : sortBy === "sellsQuantity"
      ? "best-selling"
      : "default";

  // Recursive renderer for nested categories
  const renderCategory = (category: ICategory, level = 0) => (
    <details
      key={category._id}
      className="group"
      style={{ marginLeft: `${level * 8}px` }}
    >
      <summary className="flex items-center justify-between w-full text-left py-2 px-2 cursor-pointer rounded-md hover:bg-yellow-50 transition">
        <Link
          href={`/categories/${category.slug}`}
          className="flex items-center gap-2 text-sm text-gray-800 hover:text-yellow-600"
        >
          {category.name}
        </Link>

        {category.children?.length > 0 ? (
          <ChevronRight
            size={16}
            className="text-gray-500 group-open:rotate-90 transition-transform duration-200"
          />
        ) : (
          <ChevronRight size={16} className="opacity-20" />
        )}
      </summary>

      {category.children?.length > 0 && (
        <div className="ml-2 mt-1 border-l border-gray-200 pl-3 space-y-1 animate-fadeIn">
          {category.children.map((child) => renderCategory(child, level + 1))}
        </div>
      )}
    </details>
  );

  return (
    <>
      {/* FILTER ICON for Mobile */}
      <div className="md:mx-0 lg:hidden">
        <div className="flex justify-between items-center shadow-sm p-2 bg-white">
          <select
            className="border rounded-md p-1 text-xs"
            onChange={handleSortChange}
            value={currentSort}
          >
            <option value="default">Sort by</option>
            <option value="latest">Latest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 p-1 border rounded-md shadow-sm bg-white hover:bg-gray-100"
          >
            <span className="text-xs">Filter</span>
            <FiFilter className="text-xs" />
          </button>
        </div>
      </div>

      {/* Overlay + Mobile Sidebar */}
      {showFilter && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowFilter(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg p-5 overflow-y-auto transition-transform duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter By</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Filter Sections */}
            <div className="space-y-6">
              {/* NEW: Category section */}
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-1 text-sm">
                  {categories?.length > 0 ? (
                    categories.map((cat) => renderCategory(cat))
                  ) : (
                    <p className="text-gray-500 text-sm">No categories found</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default CategoryFilter;
