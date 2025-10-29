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
    <div className="hidden lg:flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold"></h2>
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
