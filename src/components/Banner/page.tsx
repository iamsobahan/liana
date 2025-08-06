'use client';

import Image from 'next/image';
import banner1 from '../../assets/banner3.jpg';
import banner from '../../assets/banner2.jpg';
import dynamic from 'next/dynamic';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import type { FC, MouseEventHandler } from 'react';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const slides = [{ image: banner }, { image: banner1 }]

// Custom Arrows with proper types
interface ArrowProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PrevArrow: FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute z-10 left-2 sm:left-5 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-yellow-500 p-2 rounded-full focus:outline-none cursor-pointer"
  >
    <HiChevronLeft size={30} />
  </button>
);

const NextArrow: FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute z-10 right-2 sm:right-5 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-yellow-500 p-2 rounded-full focus:outline-none cursor-pointer"
  >
    <HiChevronRight size={30} />
  </button>
);

// Slider Settings
const settings = {
  dots: true,
  fade: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  appendDots: (dots: React.ReactNode) => (
    <div className="absolute bottom-5 w-full flex justify-center">{dots}</div>
  ),
  customPaging: () => (
    <div className="w-3 h-3 bg-white rounded-full mx-1" />
  ),
};

const Banner = () => {
  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full aspect-[16/11] md:aspect-[16/7]"
          >
            <Image
              src={slide.image}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              placeholder="blur"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
