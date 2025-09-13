"use client";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import dynamic from "next/dynamic";
import ProductCard from "../card";
import { IProduct } from "@/types/product";
import Slider from "react-slick";

// const Slider = dynamic(() => import("react-slick"), { ssr: false });

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
  infinite: false,
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

type FeaturePageProps = {
  feature: IProduct[];
  title: string;
};

const FeaturePage = ({ feature, title }: FeaturePageProps) => {
  return (
    <div className="container mx-auto my-2 md:my-10 px-4">
      {/* Feature title  */}
      <div className="text-center mb-3 md:mb-10">
        <h2 className="text-xs md:text-2xl font-semibold text-gray-800 uppercase tracking-widest font-rajdhani animate-fade-in-down">
          {title}
        </h2>
        <span className="block h-[2px] w-32 mx-auto mt-1 md:mt-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></span>
      </div>

      <div className="-mx-2">
        <Slider {...settings}>
          {feature.map((item, idx) => (
            <ProductCard key={idx} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturePage;
