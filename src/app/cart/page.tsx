// app/cart/page.tsx (Next.js 13+ App Router)
"use client";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import config from "@/config";
import { ICartItem } from "@/types/cart";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "@/redux/features/cart/cartSlice";

export default function CartPage() {
  const { cart: cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [cartCount, setCartCount] = useState(0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleDelete = (product: ICartItem) => {
    dispatch(removeFromCart(product));
  };
  const clearAll = () => {
    dispatch(clearCart());
  };

  const handleIncrementQuantity = (product: ICartItem) => {
    dispatch(incrementQuantity(product));
  };

  const handleDecrementQuantity = (product: ICartItem) => {
    dispatch(decrementQuantity(product));
  };
  useEffect(() => {
    setCartCount(cartItems?.length || 0);
  }, [cartItems]);

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
            SELECT ALL ( {cartCount} ITEM(S))
          </label>
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-gray-500 fw-bold hover:underline hover:text-red-500 cursor-pointer"
          >
            <HiOutlineTrash size={25} />
          </button>
        </div>

        {/* Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Your cart is empty.</p>
        ) : (
          cartItems.map((item, id) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-300 pb-4"
            >
              {/* Left */}
              <div className="flex items-center  gap-4 w-full sm:w-auto">
                <input
                  type="checkbox"
                  className="w-8 h-5.5 md:w-5 md:h-5 appearance-none border-2 border-gray-400 rounded-sm checked:before:content-['✔'] checked:before:text-orange-500 checked:before:block checked:before:text-center checked:before:text-sm focus:outline-none cursor-pointer"
                />

                <Image
                  src={`${config.API_URL}/images/products/${item.image}`}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain rounded"
                />

                <div className="flex flex-col">
                  <h2 className="whitespace-break-spaces text-sm sm:text-base font-medium">
                    {item.title}
                  </h2>
                  <span className="mt-1 text-xs  text-orange-600 py-0.5 rounded">
                    BEST PRICE
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center justify-between flex-row sm:flex-row  sm:items-center gap-3 w-full sm:w-auto">
                {/* Price */}
                <div className="flex flex-col">
                  <p className="text-orange-600 font-semibold text-lg ">
                    {item.price}৳
                  </p>
                  <p className="line-through text-gray-400 text-sm">
                    {" "}
                    {item.regularPrice}৳
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center border rounded">
                  <button
                    className="px-2 py-1 hover:bg-gray-100"
                    onClick={() => handleDecrementQuantity(item)}
                  >
                    <FaMinus size={14} />
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-2 py-1 hover:bg-gray-100"
                    onClick={() => handleIncrementQuantity(item)}
                  >
                    <FaPlus size={14} />
                  </button>
                </div>

                {/*  Delete */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  >
                    <HiOutlineTrash size={25} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-50 p-4 rounded shadow-sm h-fit">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

        <div className="flex flex-col text-md mb-2">
          <div className="flex justify-between">
            <p className="text-md">Subtotal ({cartItems.length} items)</p>
            <p className="text-md">৳ {totalPrice}</p>
          </div>
          <small>+ (Shipping fee included)</small>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Sub Total</span>
          <span>৳ {totalPrice}</span>
        </div>

        {/* Checkout Button */}
        <Link href="/checkout">
          <button className="w-full bg-orange-500 text-white fw-semibold py-1.5 md:py-3 rounded hover:bg-orange-600">
            PROCEED TO CHECKOUT ({cartItems.length} ITEM(S))
          </button>
        </Link>
      </div>
    </div>
  );
}
