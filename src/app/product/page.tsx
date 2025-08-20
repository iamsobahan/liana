'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import React from 'react';
import FeaturePage from '@/components/Feature/page';

interface SizeOption {
  label: string;
  value: string;
}

// ✅ Correctly import images
import slick from '../../assets/slick.jpeg';
import slick1 from '../../assets/slick1.jpeg';
import slick2 from '../../assets/slick2.jpeg';
import slick3 from '../../assets/slick3.jpeg';
import slick4 from '../../assets/slick4.jpeg';
import slick5 from '../../assets/slick5.jpeg';
import slick6 from '../../assets/slick6.jpeg';
import slick7 from '../../assets/slick7.jpeg';
import slick8 from '../../assets/slick8.jpeg';
import slick9 from '../../assets/slick9.jpeg';
import slick10 from '../../assets/slick10.jpeg';

type Product = {
  image: string;
};

const feature: Product[] = [
  { image: slick.src },
  { image: slick1.src },
  { image: slick2.src },
  { image: slick3.src },
  { image: slick4.src },
  { image: slick5.src },
  { image: slick6.src },
  { image: slick7.src },
  { image: slick8.src },
  { image: slick9.src },
  { image: slick10.src },
];

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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* LEFT: IMAGE */}
        <div className="flex items-center justify-center">
          <Image
            src={slick}
            alt="Premium Designer Polo"
            className="w-full h-auto max-h-[450px] object-contain rounded-lg sm:rounded-xl"
            priority
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
            Premium Designer Edition Double PK Cotton Polo - Glorious
          </h1>

          {/* Price */}
          <div className="mt-3 sm:mt-4 flex items-center gap-3">
            <span className="text-gray-400 line-through text-base sm:text-lg">
              ৳1600
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-green-600">
              ৳1260
            </span>
          </div>

          {/* Sizes */}
          <div className="mt-5 sm:mt-6">
            <h3 className="text-sm font-semibold text-gray-600">
              Select Size:
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`px-4 py-2 border rounded-md font-semibold text-sm transition-all ${
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

          {/* Quantity + Actions */}
          <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
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

            <button className="flex items-center justify-center flex-1 min-w-[140px] px-4 py-2 bg-black text-white rounded-md font-semibold shadow hover:bg-gray-800 transition text-sm">
              ＋ Add to Cart
            </button>

            <button className="flex items-center justify-center flex-1 min-w-[120px] px-4 py-2 bg-yellow-600 text-white rounded-md font-semibold shadow hover:bg-yellow-500 transition text-sm">
              Buy Now
            </button>

            <button className="flex items-center justify-center flex-1 min-w-[120px] gap-2 px-4 py-2 bg-green-700 text-white rounded-md font-semibold shadow hover:bg-green-600 transition text-sm">
              <FaWhatsapp size={16} /> WhatsApp
            </button>
          </div>

          {/* Short Description */}
          <div className="mt-5 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
            The Polo t-shirt is made with Double PK fabric which features
            premium 80% combed compact organic cotton and 20% polyester. The
            t-shirt has a soft touch which makes it very comfortable for
            day-long usage.
          </div>

          {/* Specs */}
          <div className="mt-5 sm:mt-6 text-sm text-gray-700 space-y-1">
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

      {/* Tabs */}
      <div className="tabs tabs-lift mt-8 sm:mt-12">
        {/* Tab 1 */}
        <input
          type="radio"
          name="tabs_group"
          className="tab"
          aria-label="Descriptions"
          defaultChecked
        />
        <div className="tab-content text-gray-800 p-4 sm:p-6 shadow">
          <h3 className="text-xl font-bold mb-4">Product Details</h3>
          <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
            Weekend adventures call for black casual comfort that sacrifice
            style. These shoes from{' '}
            <span className="font-semibold">North Star</span> let you stay
            trendy and relaxed all day. Lightweight soles make casual styles for
            men easy to wear without compromising on fashion.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold mb-3">Features</h3>
          <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-1 text-sm sm:text-base">
            <li>Type: Casual Shoes</li>
            <li>Gender: Men</li>
            <li>Color: Black</li>
            <li>Upper Material: Synthetic</li>
            <li>Sole: PVC</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-semibold mb-3">Style Tip</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Style up these cool casual shoes with a cotton t-shirt and ripped
            jeans for a trendy look.
          </p>
        </div>

        {/* Tab 2 */}
        <input
          type="radio"
          name="tabs_group"
          className="tab"
          aria-label="Terms & Conditions"
        />
        <div className="tab-content text-gray-800 p-4 sm:p-6 shadow">
          <p className="text-sm sm:text-base">
            {/* Your T&C content (shortened for brevity) */}
            Dear Customer, we try our best to provide you the best experience...
          </p>
        </div>

        {/* Tab 3 */}
        <input
          type="radio"
          name="tabs_group"
          className="tab"
          aria-label="Sizes"
        />
        <div className="tab-content text-gray-800 p-4 sm:p-6 text-sm sm:text-base shadow">
          This is Size Section
        </div>
      </div>

      {/* Similar Products */}
      <FeaturePage feature={feature} title="Similar Products" />
    </div>
  );
}
