"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Sort = () => {
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

  return (
    <div className="hidden lg:flex justify-between items-center mb-6 shadow-sm bg-white p-4 rounded-lg">
      <div>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 256 256"
          className="text-xl icon"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M76,60A16,16,0,1,1,60,44,16,16,0,0,1,76,60Zm52-16a16,16,0,1,0,16,16A16,16,0,0,0,128,44Zm68,32a16,16,0,1,0-16-16A16,16,0,0,0,196,76ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112ZM60,180a16,16,0,1,0,16,16A16,16,0,0,0,60,180Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,128,180Zm68,0a16,16,0,1,0,16,16A16,16,0,0,0,196,180Z"></path>
        </svg>
      </div>
      <label>
        <span className="font-medium mr-5">Sort by:</span>
        <select
          className="border rounded-lg px-1 py-1 text-sm"
          onChange={handleSortChange}
          value={currentSort}
        >
          <option value="default">Default</option>
          <option value="latest">Latest</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="best-selling">Best Selling</option>
        </select>
      </label>
    </div>
  );
};

export default Sort;
