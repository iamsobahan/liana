'use client';

import Image from 'next/image';
import { useState } from 'react';
import slick from '../../assets/slick.jpeg';
import cash from '../../assets/cash.png';

export default function CheckoutPage() {
  const [deliveryArea, setDeliveryArea] = useState('outside');

  return (
    <div className="min-h-screen text-gray-800 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-semibold mb-6 border-b pb-3">
            Checkout
          </h1>

          {/* Returning Customer */}
          <p className="text-sm mb-6">
            Returning customer?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Click here to login
            </a>
          </p>

          {/* Delivery Info */}
          <h2 className="text-lg font-medium mb-4">Delivery & Billing Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Customer Name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-lg px-4 py-2 focus:outline-blue-500"
            />
          </div>

          <input
            type="text"
            placeholder="Detail Address"
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-blue-500"
          />

          {/* Delivery Area */}
          <div className="mb-4">
            <p className="mb-2 font-medium">Select Delivery Area *</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeliveryArea('inside')}
                className={`px-4 py-2 rounded-full border transition font-medium ${
                  deliveryArea === 'inside'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inside Dhaka
              </button>
              <button
                onClick={() => setDeliveryArea('outside')}
                className={`px-4 py-2 rounded-full border transition font-medium ${
                  deliveryArea === 'outside'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Outside Dhaka
              </button>
            </div>
          </div>

          {/* Order Note */}
          <textarea
            placeholder="Additional Information (Anything You Want To Add)"
            className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-blue-500"
            rows={3}
          />

          {/* Payment Method */}
          <h2 className="text-lg font-medium mb-4">Payment Method</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" defaultChecked className="w-4 h-4" />
            <span className="font-medium">Cash On Delivery</span>
            <br />
          </label>
          <Image src={cash} alt="cash" className="w-22 mt-2" />
        </div>

        {/* RIGHT SECTION (ORDER SUMMARY) */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Order Overview
          </h2>

          {/* Item */}
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={slick}
              alt="product"
              className="w-20 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium">
                Abaya Al-Basharah - Premium Box Pleated Abaya || GT-2003
              </h3>
              <p className="text-sm text-gray-600">Size 52, Color: Lavender</p>
              <p className="text-sm font-semibold">Tk. 1690</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Sub-Total</span>
              <span>1690</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>150</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>1840</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button className="font-medium bg-black text-white px-4 rounded-lg hover:bg-gray-900">
              Apply
            </button>
          </div>

          {/* Place Order */}
          <button className="mt-6 w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
