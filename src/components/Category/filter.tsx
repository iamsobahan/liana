"use client";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

const CategoryFilter = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      {/* FILTER ICON for Mobile */}
      <div className="mx-2 md:mx-0 lg:hidden">
        <h2 className="text-xl font-semibold mb-2">Gold Hand Ring</h2>
        <div className="flex justify-between items-center">
          <select className="border rounded-md p-1.5">
            <option value="default">Sort by</option>
            <option value="latest">Latest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 p-1.5 border rounded-md shadow-sm bg-white hover:bg-gray-100"
          >
            <span className="text-sm font-medium">Filter</span>
            <FiFilter className="text-lg" />
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter By</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>
            <FilterContent />
          </aside>
        </>
      )}
    </>
  );
};

export default CategoryFilter;
