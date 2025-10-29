import { ICategory } from "@/types/category";
import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
interface IProps {
  categories: ICategory[];
}
const CategoryFilterSidebar: FC<IProps> = ({ categories }) => {
  const renderCategory = (category: ICategory, level = 0) => (
    <details
      key={category._id}
      className="group"
      style={{ marginLeft: `${level * 10}px` }}
    >
      <summary className="flex items-center justify-between w-full text-left py-2 px-3 cursor-pointer rounded-md hover:bg-yellow-50 transition">
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
    <aside className="hidden lg:block bg-white shadow-md rounded-xl p-5 h-fit">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-sm text-gray-800 mb-4 border-b pb-2 border-gray-200">
            Categories
          </h3>

          <div className="space-y-2 text-sm">
            {categories?.length > 0 ? (
              categories.map((cat) => renderCategory(cat))
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategoryFilterSidebar;
