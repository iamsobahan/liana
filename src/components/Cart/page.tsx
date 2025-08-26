'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  // Dummy cart data (replace with your state/store later)
  const cartItems = [
    { id: 1, name: 'Premium Coffee', price: 250, qty: 1 },
    { id: 2, name: 'Dark Chocolate', price: 150, qty: 2 },
  ];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      {/* ✅ Floating Cart Button */}
      <div className="fixed top-1/3 right-0 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center  cursor-pointer overflow-hidden rounded-l-3xl shadow-2xl backdrop-blur-md bg-gradient-to-b from-[#5C4424] to-[#A98153] hover:scale-105 transition duration-300 p-3"
        >
          <IoCartOutline className="h-7 w-7 text-white" />
          <span className="text-xs font-semibold text-white mt-1">
            {cartItems.length} items
          </span>
          <div className="w-full h-[1px] bg-white/20 my-2"></div>
          <span className="text-sm font-bold text-white tracking-wide">
            ৳ {totalPrice}
          </span>
        </button>
      </div>

      {/* ✅ Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-white to-gray-100 shadow-2xl z-50 p-6 flex flex-col rounded-l-2xl"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'tween', duration: 0.35 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-center text-xl font-bold text-gray-800">
                  <IoCartOutline size={30}/> <span className='ml-3'>My Cart</span>
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-gray-600 hover:text-red-500 transition text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b py-4 hover:bg-gray-50 rounded-lg px-2 transition"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      ৳ {item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>৳ {totalPrice}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/cart"
                  className="block w-full text-center bg-gray-200 text-gray-800 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  className="block w-full text-center bg-[#A98153] text-white py-2 rounded-xl font-semibold hover:bg-[#8c6942] transition"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
