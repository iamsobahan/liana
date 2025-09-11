"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import clsx from "clsx";

/**
 * Generates an array of page numbers to display in the pagination controls.
 * This logic ensures a fixed number of pages are shown around the current page.
 */
const getPageNumbers = (currentPage, totalPages, maxPages = 5) => {
  const pages = [];
  const halfMaxPages = Math.floor(maxPages / 2);
  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, currentPage + halfMaxPages);

  // Adjust start and end pages to always show maxPages if possible
  if (endPage - startPage + 1 < maxPages) {
    if (currentPage <= halfMaxPages) {
      endPage = Math.min(totalPages, maxPages);
    } else if (currentPage > totalPages - halfMaxPages) {
      startPage = Math.max(1, totalPages - maxPages + 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
};

export default function DynamicPagination({ total, limit }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(total / limit);

  // Do not render if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  // Creates the URL with the new page number while preserving existing search params
  const createPageURL = useCallback(
    (pageNumber) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

  return (
    <div className="flex justify-center md:justify-end mt-10">
      <nav className="inline-flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => router.push(createPageURL(currentPage - 1))}
          disabled={currentPage === 1}
          className={clsx(
            "w-10 h-10 flex justify-center items-center text-xl border rounded-full transition duration-200",
            {
              "text-gray-400 border-gray-200 cursor-not-allowed":
                currentPage === 1,
              "text-gray-600 border-gray-300 hover:text-black hover:border-yellow-600 cursor-pointer":
                currentPage !== 1,
            }
          )}
        >
          <HiChevronLeft />
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => router.push(createPageURL(page))}
            disabled={page === currentPage}
            className={clsx(
              "w-10 h-10 flex justify-center items-center text-xl rounded-full transition duration-200",
              {
                "border-yellow-600 bg-yellow-600 text-white shadow-md cursor-not-allowed":
                  page === currentPage,
                "border-gray-300 text-gray-600 hover:text-black hover:border-yellow-600 cursor-pointer":
                  page !== currentPage,
              }
            )}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => router.push(createPageURL(currentPage + 1))}
          disabled={currentPage === totalPages}
          className={clsx(
            "w-10 h-10 flex justify-center items-center text-xl border rounded-full transition duration-200",
            {
              "text-gray-400 border-gray-200 cursor-not-allowed":
                currentPage === totalPages,
              "text-gray-600 border-gray-300 hover:text-black hover:border-yellow-600 cursor-pointer":
                currentPage !== totalPages,
            }
          )}
        >
          <HiChevronRight />
        </button>
      </nav>
    </div>
  );
}
