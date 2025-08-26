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
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="flex items-center text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
        <IoCartOutline /> <span className='ml-2 text-lg'>Your Shopping Cart</span>
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 p-4 rounded-2xl shadow-sm bg-white transition"
              >
                {/* Product Image */}
                <div className="flex items-center gap-4 w-full md:w-2/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover shadow-sm"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.variant}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, 'dec')}
                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 w-8 text-center font-semibold">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 'inc')}
                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Price & Subtotal */}
                <div className="text-right md:w-1/5">
                  <p className="text-gray-500 text-sm">Price</p>
                  <p className="font-semibold">৳ {item.price}</p>
                </div>
                <div className="text-right md:w-1/5">
                  <p className="text-gray-500 text-sm">Subtotal</p>
                  <p className="font-semibold">৳ {item.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-50 p-6 rounded-2xl shadow-md">
            <div className="text-xl font-bold">
              Total: <span className="text-[#A98153]">৳ {total}</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition shadow"
              >
                Continue Shopping
              </Link>
              <Link
                href="/checkout"
                className="px-6 py-3 rounded-xl bg-[#A98153] text-white font-semibold hover:bg-[#8c6942] transition shadow"
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