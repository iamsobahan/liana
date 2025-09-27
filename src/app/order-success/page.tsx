"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-xl max-w-xl w-full p-6 sm:p-5 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-green-500 w-20 h-20 sm:w-24 sm:h-24" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Payment Successful
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6">
          Thank you for your purchase! Your order has been placed successfully.
          You’ll receive a confirmation email shortly.
        </p>

        {/* Order summary mockup */}
        {/*  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 text-left shadow-inner">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-600 text-sm sm:text-base mb-2">
            <span>Product Name</span>
            <span>$99.00</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm sm:text-base mb-2">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex justify-between font-bold text-gray-800 text-base sm:text-lg">
            <span>Total</span>
            <span>$104.00</span>
          </div>
        </div> */}

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          style={{ alignItems: "center" }}
        >
          <Link
            href="/orders"
            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-semibold shadow-md transition"
          >
            View Orders
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-sm sm:text-base font-semibold shadow-md transition"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
