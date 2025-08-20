'use client';
import { useState } from 'react';
import slick from '../../assets/slick1.jpeg';
import Image from 'next/image';

import React from 'react';

interface SizeOption {
  label: string;
  value: string;
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);

  const sizes: SizeOption[] = [
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: '2XL', value: '2XL' },
  ];

  const handleQuantity = (type: 'inc' | 'dec') => {
    setQuantity((prev) => {
      if (type === 'dec' && prev > 1) return prev - 1;
      if (type === 'inc') return prev + 1;
      return prev;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <Image
            src={slick} // replace with actual image
            alt="Premium Designer Polo"
            className="w-full object-contain rounded-xl"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Premium Designer Edition Double PK Cotton Polo - Glorious
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-gray-400 line-through text-lg">৳1600</span>
            <span className="text-3xl font-bold text-green-600">৳1260</span>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-600">
              Select Size:
            </h3>
            <div className="flex gap-3 mt-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`px-4 py-2 border rounded-md font-semibold transition-all ${
                    selectedSize === size.value
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleQuantity('dec')}
                className="px-3 py-2 text-xl text-gray-800 font-bold hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4 text-gray-800 font-semibold py-2">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantity('inc')}
                className="px-3 py-2 text-xl font-bold text-gray-800 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-semibold shadow-md hover:bg-gray-800 transition">
              <span className="text-xl">＋</span> Add to Cart
            </button>
          </div>

          <div className="mt-6 text-gray-600 leading-relaxed">
            The Polo t-shirt is made with Double PK fabric which features
            premium 80% combed compact organic cotton and 20% polyester. The
            t-shirt has a soft touch which makes it very comfortable for
            day-long usage.
          </div>

          <div className="mt-6 text-sm text-gray-700">
            <p>
              <strong>Fabric type:</strong> Double PK
            </p>
            <p>
              <strong>Composition:</strong> 80% cotton + 20% polyester
            </p>
            <p>
              <strong>GSM:</strong> 210-220
            </p>
          </div>
        </div>
      </div>

      {/* name of each tab group should be unique */}
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-lift">
        <label className="tab bg-gray-100 text-gray-900">
          <input type="radio" name="my_tabs_4" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
          Live
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 1
        </div>

        <label className="tab bg-gray-100 text-gray-900">
          <input type="radio" name="my_tabs_4" defaultChecked />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
          Laugh
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 2
        </div>

        <label className="tab bg-gray-100 text-gray-900:important">
          <input type="radio" name="my_tabs_4" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          Love
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 3
        </div>
      </div>
    </div>
  );
}
