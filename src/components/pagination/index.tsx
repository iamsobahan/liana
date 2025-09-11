"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  total: number;
  limit: number;
  maxPages?: number;
}

const Pagination = ({ total, limit, maxPages = 10 }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    let startPage = Math.max(currentPage - Math.floor(maxPages / 2), 1);
    let endPage = startPage + maxPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center md:justify-end mt-10">
      <nav className="inline-flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => router.push(createPageURL(currentPage - 1))}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex justify-center items-center text-xl border rounded-full transition duration-200 ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-600 border-gray-300 hover:text-black hover:border-yellow-600 cursor-pointer"
          }`}
        >
          <HiChevronLeft />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => router.push(createPageURL(page))}
            disabled={page === currentPage}
            className={`w-10 h-10 flex justify-center items-center text-xl rounded-full transition duration-200 border ${
              page === currentPage
                ? "border-yellow-600 bg-yellow-600 text-white shadow-md cursor-not-allowed"
                : "border-gray-300 text-gray-600 hover:text-black hover:border-yellow-600 cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => router.push(createPageURL(currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex justify-center items-center text-xl border rounded-full transition duration-200 ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-600 border-gray-300 hover:text-black hover:border-yellow-600 cursor-pointer"
          }`}
        >
          <HiChevronRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
