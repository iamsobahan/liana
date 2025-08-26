'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useRef } from 'react';

import category from './../../assets/category1.png';
import category1 from './../../assets/category2.png';
import category2 from './../../assets/category3.png';
import category3 from './../../assets/category4.png';
import category4 from './../../assets/category5.png';
import category5 from './../../assets/category6.png';
import Link from 'next/link';

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 -left-8 transform -translate-y-1/2 z-10 cursor-pointer text-yellow-500 hover:text-yellow-600"
    onClick={onClick}
  >
    <HiChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
  </div>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-10 cursor-pointer text-yellow-500 hover:text-yellow-600"
    onClick={onClick}
  >
    <HiChevronRight className="w-8 h-8 md:w-10 md:h-10" />
  </div>
);

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1536,
      settings: { slidesToShow: 5 },
    },
    {
      breakpoint: 1280,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 2, arrows: false },
    },
  ],
};

const CategoryPage = () => {
  const sliderRef = useRef<Slider>(null);

  const categories = [
    {
      title: 'EAR RINGS',
      image: category,
    },
    {
      title: 'BRACELETS',
      image: category1,
    },
    {
      title: 'BANGLES',
      image: category3,
    },
    {
      title: 'HAND RINGS',
      image: category5,
    },
    {
      title: 'BELLY CHAIN',
      image: category4,
    },
    {
      title: 'IDK',
      image: category,
    },
    {
      title: 'IFU',
      image: category2,
    },
    {
      title: 'COVER UP',
      image: category5,
    },
  ];

  return (
    <div className="container mx-auto my-2 md:my-10 px-4">
      <div className="text-center mb-3 md:mb-10">
        <h2 className="text-xs md:text-2xl font-semibold text-gray-800 uppercase tracking-widest font-rajdhani animate-fade-in-down">
          Feature Catagories
        </h2>
        <span className="block h-[2px] w-32 mx-auto mt-1 md:mt-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></span>
      </div>
      <div className="relative"> 
        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {categories.map((cat, index) => (
            <div key={index} className="px-2">
              <div className="relative rounded-lg overflow-hidden cursor-pointer">
                <Link href="/categories">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    
                    className="object-cover w-full h-22 md:h-64"
                  />
                </Link>
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white cursor-pointer hover:bg-black hover:text-white transition px-6 md:px-4 w-30 md:w-50 py-1 md:py-2 rounded-lg shadow text-center font-normal md:font-semibold text-xs md:text-lg text-gray-800">
                  {cat.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryPage;
