// app/cart/page.tsx (Next.js 13+ App Router)
'use client';
import {  FaMinus, FaPlus } from 'react-icons/fa';
import { HiOutlineTrash } from 'react-icons/hi';
import slick from '../../assets/slick.jpeg'
import slick1 from '../../assets/slick1.jpeg'
import Image from 'next/image';

function CartItem({
  title,
  brand,
  size,
  price,
  oldPrice,
  quantity,
}: {
  title: string;
  brand: string;
  size: string;
  price: number;
  oldPrice: number;
  quantity: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-300 pb-4">
      {/* Left */}
      <div className="flex items-center  gap-4 w-full sm:w-auto">
        <input
          type="checkbox"
          className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-sm checked:before:content-['✔'] checked:before:text-orange-500 checked:before:block checked:before:text-center checked:before:text-sm focus:outline-none cursor-pointer"
        />

        <Image
          src={slick}
          alt="slick"
          className="w-20 h-20 object-contain rounded"
        />

        <div className="flex flex-col">
          <h2 className="whitespace-break-spaces text-sm sm:text-base font-medium">
            {title}
          </h2>
          <p className="whitespace-break-spaces text-xs text-gray-500">
            {brand}, {size}
          </p>
          <span className="mt-1 text-xs  text-orange-600 py-0.5 rounded">
            BEST PRICE
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        {/* Price */}
        <div className="flex flex-col">
          <p className="text-orange-600 font-semibold text-lg ">{price}৳</p>
          <p className="line-through text-gray-400 text-sm"> {oldPrice}৳</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center border rounded">
          <button className="px-2 py-1 hover:bg-gray-100">
            <FaMinus size={14} />
          </button>
          <span className="px-3">{quantity}</span>
          <button className="px-2 py-1 hover:bg-gray-100">
            <FaPlus size={14} />
          </button>
        </div>

        {/* Wishlist + Delete */}
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-red-500 cursor-pointer">
            <HiOutlineTrash size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-800">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 bg-white p-4 rounded shadow-sm">
        {/* Select All + Delete */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-sm checked:before:content-['✔'] checked:before:text-orange-500 checked:before:block checked:before:text-center checked:before:text-sm focus:outline-none cursor-pointer"
            />
            SELECT ALL (6 ITEM(S))
          </label>
          <button className="flex items-center gap-1 text-gray-600 fw-bold hover:underline hover:text-red-500 cursor-pointer">
            <HiOutlineTrash size={25} />
          </button>
        </div>

        {/* Items */}
        <CartItem
          title="Rajkonna Light Moisturizer With Rice Water And Licorice Extract (50gm)"
          brand="RAJKONNA"
          size="Scent: Fresh"
          price={250}
          oldPrice={295}
          quantity={1}
        />
        <CartItem
          title="Rajkonna Moisturizing Shower Gel - 330ml"
          brand="RAJKONNA"
          size="Scent: Fresh"
          price={280}
          oldPrice={330}
          quantity={1}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-50 p-4 rounded shadow-sm h-fit">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

        <div className="flex flex-col text-md mb-2">
          <div className="flex justify-between">
            <p className="text-md">Subtotal (0 items)</p>
            <p className="text-md">৳ 0</p>
          </div>
          <small>(Shipping fee included)</small>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Sub Total</span>
          <span>৳ 0</span>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-orange-500 text-white fw-semibold py-3 rounded hover:bg-orange-600">
          PROCEED TO CHECKOUT (0)
        </button>
      </div>
    </div>
  );
}
