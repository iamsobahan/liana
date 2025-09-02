'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoCartOutline } from 'react-icons/io5';
import slick from '../../assets/slick.jpeg';
import slick2 from '../../assets/slick2.jpeg';
import slick3 from '../../assets/slick3.jpeg';
import slick4 from '../../assets/slick4.jpeg';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Coffee',
      variant: '250g Pack',
      price: 250,
      qty: 1,
      image: slick,
    },
    {
      id: 2,
      name: 'Dark Chocolate',
      variant: '100g Bar',
      price: 150,
      qty: 2,
      image: slick2,
    },
    {
      id: 3,
      name: 'Matcha Green Tea',
      variant: '50g Tin',
      price: 350,
      qty: 1,
      image: slick3,
    },
    {
      id: 4,
      name: 'Roasted Almonds',
      variant: '200g Pack',
      price: 220,
      qty: 2,
      image: slick4,
    },
  ]);

  // Increase / Decrease Quantity
  const updateQty = (id: number, action: 'inc' | 'dec') => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                action === 'inc'
                  ? item.qty + 1
                  : item.qty > 1
                  ? item.qty - 1
                  : 1,
            }
          : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-6xl mx-auto px-3 py-3 md:py-10 text-gray-800">
      <h1 className="flex items-center text-2xl font-bold text-gray-900 mb-2 md:mb-8 text-center md:text-left">
        <IoCartOutline className="mr-2" size={30} />
        <span className="text-xl uppercase ">Your Shopping Cart</span>
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* ✅ Mobile: grid with 2 items per row | Desktop: normal flex */}
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-2 md:gap-4 p-3 md:p-4 rounded-xl shadow-sm bg-white transition"
              >
                {/* Product Image + Info */}
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-2/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg object-cover shadow-sm w-full md:w-[80px] h-[80px]"
                  />
                  <div className="text-center md:text-left">
                    <h2 className="font-semibold text-sm md:text-lg">
                      {item.name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">
                      {item.variant}
                    </p>
                  </div>
                </div>

                {/* Gorgeous Premium Quantity Controls */}
                <div className="flex items-center justify-center gap-1 md:gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => updateQty(item.id, 'dec')}
                    className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-lg font-bold text-gray-700 hover:from-gray-300 hover:to-gray-400 shadow active:scale-90 transition"
                  >
                    −
                  </button>
                  <span className="px-2 w-6 text-center font-semibold text-sm md:text-base">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 'inc')}
                    className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#A98153] to-[#8c6942] rounded-full text-lg font-bold text-white hover:from-[#8c6942] hover:to-[#705232] shadow active:scale-90 transition"
                  >
                    +
                  </button>
                </div>

                {/* Price & Subtotal */}
                <div className="text-center md:text-right mt-2 md:mt-0">
                  <div className="flex">
                    <p className="text-xs md:text-sm text-gray-500 mr-10">Price-</p>
                    <p className="font-semibold text-sm md:text-base">
                      {item.price}৳
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-xs md:text-sm text-gray-500 mr-5">Subtotal-</p>
                    <p className="font-semibold text-sm md:text-base">
                      {item.price * item.qty}৳
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-0 md:mt-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md">
            <div className="text-lg md:text-xl font-bold">
              Total: <span className="text-[#A98153]">৳ {total}</span>
            </div>
            <div className="flex gap-3 md:gap-4">
              <Link
                href="/shop"
                className="px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition shadow"
              >
                Continue Shopping
              </Link>
              <Link
                href="/checkout"
                className="px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-[#A98153] text-white font-semibold hover:bg-[#8c6942] transition shadow"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
