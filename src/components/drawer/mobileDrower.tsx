"use client";
import { useState } from "react";
import Link from "next/link";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { ICategory } from "@/types/category";

type IProps = {
  categories: ICategory[];
  isDrawerOpen: boolean;
  setDrawerOpen: ((open: boolean) => void) 
};

const MobileDrawer = ({ isDrawerOpen, setDrawerOpen, categories }:IProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);

  return (
    <div
      className={`sm:hidden fixed inset-y-0 right-0 bg-white z-50 w-2/3 transform transition-transform duration-300 ease-linear ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="text-gray-800 text-right w-full px-4 py-2.5 text-lg border-b border-gray-300 font-medium"
        onClick={() => setDrawerOpen(false)}
      >
        ✕ Close
      </button>

      <ul className="flex flex-col gap-2 px-4 py-2 text-lg uppercase font-medium overflow-y-auto h-[calc(100vh-80px)]">
        <li>
          <Link
            href="/"
            className="hover:text-[#D6A74E] text-sm capitalize"
            onClick={() => setDrawerOpen(false)}
          >
            HOME
          </Link>
        </li>

        {categories?.map((cat) => (
          <li key={cat._id} className="hover:text-[#D6A74E]">
            {/* Parent Category */}
            <div className="flex justify-between items-center cursor-pointer ">
              {/* Always clickable link */}
              <Link
                href={`/categories/${cat.slug}`}
                className="hover:text-[#D6A74E] text-sm capitalize"
                onClick={() => setDrawerOpen(false)}
              >
                {cat.name}
              </Link>

              {/* Only show arrow if children exist */}
              {cat.children && cat.children.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent Link click
                    setOpenCategory((prev) =>
                      prev === cat._id ? null : cat._id
                    );
                  }}
                >
                  {openCategory === cat._id ? (
                    <HiChevronUp className="text-xl" />
                  ) : (
                    <HiChevronDown className="text-xl" />
                  )}
                </button>
              )}
            </div>

            {/* Subcategories */}
            {openCategory === cat._id && cat.children?.length > 0 && (
              <ul className="pl-4 text-sm text-gray-700">
                {cat.children.map((subCat) => (
                  <li key={subCat._id} className="py-1">
                    <div className="flex justify-between items-center">
                      {/* Subcategory link */}
                      <Link
                        href={`/categories/${subCat.slug}`}
                        className="text-xs capitalize hover:text-[#D6A74E]"
                        onClick={() => setDrawerOpen(false)}
                      >
                        {subCat.name}
                      </Link>

                      {/* Show arrow if deeper children exist */}
                      {subCat.children && subCat.children.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSubCategory((prev) =>
                              prev === subCat._id ? null : subCat._id
                            );
                          }}
                        >
                          {openSubCategory === subCat._id ? (
                            <HiChevronUp className="text-lg" />
                          ) : (
                            <HiChevronDown className="text-lg" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Sub-subcategories */}
                    {openSubCategory === subCat._id &&
                      subCat.children?.length > 0 && (
                        <ul className="pl-4">
                          {subCat.children.map((subSubCat) => (
                            <li key={subSubCat._id} className="py-1">
                              <Link
                                href={`/categories/${subSubCat.slug}`}
                                className="hover:text-[#D6A74E] text-xs capitalize"
                                onClick={() => setDrawerOpen(false)}
                              >
                                {subSubCat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileDrawer;
