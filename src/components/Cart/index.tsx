"use client";

import { useState } from "react";
import Link from "next/link";
import { BiSolidShoppingBags } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import config from "@/config";
import { ICartItem } from "@/types/cart";
import { removeFromCart } from "@/redux/features/cart/cartSlice";

export default function Cart() {
  const { cart: cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cartItems?.length || 0;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleRemoveFromCart = (item: ICartItem) => {
    dispatch(removeFromCart(item));
  };

  return (
    <>
      {/* ✅ Floating Cart Button */}
      <div className="fixed top-1/3 right-0 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center  cursor-pointer overflow-hidden  shadow-2xl bg-[#46351F] hover:scale-105 transition duration-300  pt-[2px] md:pt-1"
        >
          <BiSolidShoppingBags className="h-3 w-3 md:h-5 md:w-5 text-[#EBA659]" />
          <span className="text-xs font-medium md:font-semibold text-[#EBA659] mt-0 md:mt-1">
            {cartCount} items
          </span>
          <p className="bg-[#A98153] w-full text-xs font-normal md:font-bold md:text-md text-white tracking-wide pt-[2px]  md:mt-1 px-[4px] md:px-[5px]">
            <span className="text-xs md:text-md font-normal md:font-bold mr-.5">
              ৳
            </span>
            {totalPrice}
          </p>
        </button>
      </div>

      {/* ✅ Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full md:w-96 bg-gradient-to-b from-white to-gray-100 shadow-2xl z-50 p-6 flex flex-col rounded-l-2xl"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'tween', duration: 0.35 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-center text-xl font-bold text-gray-800">
                  <BiSolidShoppingBags size={30} />{' '}
                  <span className="ml-3">My Cart</span>
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-gray-600 hover:text-red-500 transition text-lg font-bold"
                >
                  abc
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center border-b py-3 sm:py-4 hover:bg-gray-50 rounded-lg   transition"
                  >
                    {/* Left Side: Image + Info */}
                    <div className="flex items-center gap-1">
                      {/* Product Image */}
                      <Image
                        src={`${config.API_URL}/images/products/${item?.image}`}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border"
                        loading="lazy"
                      />

                      {/* Product Info */}
                      <div className="flex flex-col">
                        <p className="text-sm  font-semibold text-gray-800 whitespace-nowrap w-40 overflow-hidden text-ellipsis">
                          {item.title}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Price */}
                    <span className="text-sm sm:text-base font-bold text-gray-700 whitespace-nowrap">
                      ৳ {item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="text-gray-600 hover:text-red-500 transition"
                    >
                      ✕
                    </button>
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
