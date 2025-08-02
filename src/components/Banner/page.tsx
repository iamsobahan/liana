'use client';

import Image from 'next/image';
import banner1 from '../../assets/banner3.jpg';
import banner from '../../assets/banner2.jpg';
import dynamic from 'next/dynamic';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const slides = [{ image: banner }, { image: banner1 }];

// Custom Arrows
const PrevArrow = ({ onClick }: any) => (
  <button
    className="absolute z-10 left-2 sm:left-5 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-yellow-500 p-2 rounded-full focus:outline-none cursor-pointer"
    onClick={onClick}
  >
    <FaArrowLeft size={20} />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    className="cursor-pointer absolute z-10 right-2 sm:right-5 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-yellow-500 p-2 rounded-full focus:outline-none"
    onClick={onClick}
  >
    <FaArrowRight size={20} />
  </button>
);

// Slider Settings
const settings = {
  dots: false,
  fade: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  
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
            />
            <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-10 md:pr-16 bg-black/20"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
