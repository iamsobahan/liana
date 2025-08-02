'use client';

import React from 'react';
import Image from 'next/image';

import New from './../../assets/NewArrival.jpeg';
import category from './../../assets/category1.png';
import category1 from './../../assets/category2.png';
import category2 from './../../assets/category3.png';
import category3 from './../../assets/category4.png';
import category4 from './../../assets/category5.png';
import category5 from './../../assets/category6.png';

const CategoryPage = () => {
  const items = [
    { src: New, span: true },
    { src: category },
    { src: category1 },
    { src: category2 },
    { src: category3 },
    { src: category4 },
    { src: category5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='text-center'>
        <h2 className="text-md md:text-2xl font-normal mb-10 text-center font-rajdhani uppercase tracking-widest relative inline-block text-gray-900 animate-fade-in-down">
          Explore Our Categories
          <span className="block h-[2px] w-50 mx-auto mt-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-"></span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:grid-rows-2 gap-2 ">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-full cursor-pointer ${item.span ? 'row-span-2 xl:row-span-2' : ''}`}
          >
            <div
              className={`relative w-full ${item.span ? 'h-full' : 'h-auto'}`}
            >
              <Image
                src={item.src}
                alt={`Category ${index + 1}`}
                fill={item.span ? true : undefined}
                layout={item.span ? undefined : 'responsive'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
