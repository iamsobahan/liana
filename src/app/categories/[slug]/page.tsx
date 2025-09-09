"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiFilter } from "react-icons/fi"; // filter icon
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import slick from "../../../assets/slick.jpeg";
import slick3 from "../../../assets/slick3.jpeg";
import slick4 from "../../../assets/slick4.jpeg";
import slick5 from "../../../assets/slick5.jpeg";
import slick1 from "../../../assets/slick1.jpeg";
import slick2 from "../../../assets/slick2.jpeg";
import slick0 from "../../../assets/slick0.jpeg";
import slick8 from "../../../assets/slick8.jpeg";
import slick7 from "../../../assets/slick3.jpeg";
import slick6 from "../../../assets/slick10.jpeg";
import slick9 from "../../../assets/slick9.jpeg";
import slick10 from "../../../assets/slick10.jpeg";
import { div } from "framer-motion/client";

const feature = [
  { image: slick },
  { image: slick1 },
  { image: slick2 },
  { image: slick3 },
  { image: slick4 },
  { image: slick5 },
  { image: slick0 },
  { image: slick8 },
  { image: slick7 },
  { image: slick6 },
  { image: slick9 },
  { image: slick10 },
];

export default function ShopPage() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto  py-2 md:py-8 text-gray-800">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTER SIDEBAR (desktop) */}
          <aside className="hidden lg:block bg-white shadow-md rounded-xl p-5 h-fit">
            <FilterContent />
          </aside>

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

          {/* PRODUCT GRID */}
          <main className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gold Hand Ring</h2>
              <label>
                <span className="font-medium mr-5">sort by:</span>
                <select className="border rounded-lg px-1 py-1 text-sm">
                  <option value="default">Default</option>
                  <option value="latest">Latest</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </label>
            </div>

            {/* Grid */}
            <div className="grid gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {feature.map((product, idx) => (
                <div key={idx} className="px-1 md:px-2 cursor-pointer">
                  <div className="bg-white shadow-md rounded-sm overflow-hidden hover:shadow-lg border-gray-100 transition">
                    <Link href="/product">
                      <div className="relative h-32 md:h-60 w-full">
                        <Image
                          src={product.image}
                          alt={`Product ${idx + 1}`}
                          fill
                          className="rounded-tr-sm object-cover h-[120px] w-[400px] md:h-[240px] md:w-[500px]"
                        />
                      </div>
                      <div className="mt-0.5 md:mt-2 md:p-1 text-center">
                        <h4 className="font-raleway md:font-semibold text-md md:text-lg text-gray-800">
                          Women Denim Jewelry - Skythread
                        </h4>
                        <p className="text-sm text-red-500 mt-2 bg-yellow-100 px-2 py-1 inline-block rounded font-bold">
                          Save TK 540
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="line-through text-gray-500 mr-1">
                            ৳2500
                          </span>
                          <span className="text-black font-bold">৳1900</span>
                        </div>
                      </div>
                    </Link>
                    <div className="bg-gray-900 hover:bg-gray-950 transition text-white text-center py-1 mt-2 md:mt-0 pt-1 md:pt-3 font-medium md:font-semibold font-raleway cursor-pointer">
                      <span className="inline-flex items-center justify-center gap-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m5-5v5m4-5v5m1 4a1 1 0 100-2 1 1 0 000 2zm-6 0a1 1 0 100-2 1 1 0 000 2z"
                          />
                        </svg>
                        ADD TO CART
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center md:justify-end mt-10">
              <nav className="inline-flex items-center space-x-2">
                {/* Prev Button */}
                <button className="w-10 h-10  flex justify-center items-center  text-xl border border-gray-300 rounded-full text-gray-600 hover:text-black hover:border-yellow-600 transition duration-200 cursor-pointer">
                  <HiChevronLeft />
                </button>
                {/* Page Numbers */}
                <button className="w-10 h-10  flex justify-center items-center rounded-full border border-gray-300 text-gray-600 hover:text-black hover:border-yellow-600 transition duration-200 cursor-pointer text-xl">
                  1
                </button>
                <button className="w-10 h-10  flex justify-center items-center  text-xl rounded-full border border-yellow-600 bg-yellow-600 text-white shadow-md transition duration-200 cursor-pointer">
                  2
                </button>
                <button className="w-10 h-10  flex justify-center items-center  text-xl rounded-full border border-gray-300 text-gray-600 hover:text-black hover:border-yellow-600 transition duration-200 cursor-pointer">
                  3
                </button>
                <button className="w-10 h-10  flex justify-center items-center  text-xl rounded-full border border-gray-300 text-gray-600 hover:text-black hover:border-yellow-600 transition duration-200 cursor-pointer">
                  4
                </button>
                {/* Next Button */}
                <button className="w-10 h-10  flex justify-center items-center  text-xl border border-gray-300 rounded-full text-gray-600 hover:text-black hover:border-yellow-600 transition duration-200 cursor-pointer text-xxl">
                  <HiChevronRight />
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* Sidebar Filter Extracted into Component */
function FilterContent() {
  return (
    <>
      {/* Color */}
      <div className="mb-6 container mx-auto">
        <h3 className="font-medium mb-2">Color</h3>
        <div className="space-y-2 text-sm">
          {[
            "Lavender",
            "Slate Blue",
            "Bottle Green",
            "Yellow",
            "Burnt Orange",
            "Peanut",
            "Red",
            "Coffee",
          ].map((color) => (
            <label key={color} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <div className="space-y-2 text-sm">
          {[
            "100 to 300",
            "301 to 500",
            "501 to 1000",
            "1001 to 2500",
            "2501 to 5000",
            "5001 to 10000",
          ].map((price) => (
            <label key={price} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {price}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Size</h3>
        <div className="space-y-2 text-sm">
          {["Free Size", "90x30 Inch", "80x30 Inch"].map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2 text-sm">
          {[
            "Abaya & Gown",
            "Hijab & Niqab",
            "Khimar & Jilbab",
            "Cape & Cover Up",
            "Undergarments",
            "Accessories & Others",
          ].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
