'use client';
import { useState } from 'react';
import slick from '../../assets/slick1.jpeg';
import Image from 'next/image';

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
        <div className="flex justify-center">
          <Image
            src={slick} // replace with actual image
            alt="Premium Designer Polo"
            className="w-full h-full max-w-md object-contain rounded-xl"
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
      <hr className="text-gray-400 mt-5" />
      {/* Size Chart */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800">Size Chart</h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-gray-800 border border-gray-800 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Chest (in)</th>
                <th className="border px-4 py-2">Length (in)</th>
                <th className="border px-4 py-2">Sleeve (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">M</td>
                <td className="border px-4 py-2">39</td>
                <td className="border px-4 py-2">27.5</td>
                <td className="border px-4 py-2">8.25</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">L</td>
                <td className="border px-4 py-2">40.5</td>
                <td className="border px-4 py-2">28.5</td>
                <td className="border px-4 py-2">8.5</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">XL</td>
                <td className="border px-4 py-2">43</td>
                <td className="border px-4 py-2">29</td>
                <td className="border px-4 py-2">9</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">2XL</td>
                <td className="border px-4 py-2">45</td>
                <td className="border px-4 py-2">30</td>
                <td className="border px-4 py-2">9.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
