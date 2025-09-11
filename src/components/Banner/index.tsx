"use client";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { FC, MouseEventHandler } from "react";
import { ISlider } from "@/types/slider";
import config from "@/config";
import Link from "next/link";
import Slider from "react-slick";

interface ArrowProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
type IProps = {
  slides: ISlider[];
};

const PrevArrow: FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute z-10 left-2 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-900 bg-gray-300 hover:bg-yellow-500 p-2 rounded-full focus:outline-none cursor-pointer"
  >
    <HiChevronLeft size={20} />
  </button>
);

const NextArrow: FC<ArrowProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute z-10 right-2 sm:right-5 top-1/2 transform -translate-y-1/2 text-gray-900 bg-gray-300 hover:bg-yellow-500 p-2 rounded-full focus:outline-none cursor-pointer"
  >
    <HiChevronRight size={20} />
  </button>
);

// Slider Settings
const settings = {
  dots: true,
  fade: false,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  appendDots: (dots: React.ReactNode) => (
    <div className="absolute bottom-5 w-full flex justify-center">{dots}</div>
  ),
  customPaging: () => <div className="w-3 h-3 bg-white rounded-full mx-1" />,
};

const Banner = ({ slides }: IProps) => {
  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Link href={slide.linkUrl} key={index} className="relative w-full">
            <Image
              src={`${config.API_URL}/images/sliders/${slide.imageUrl}`}
              alt={`Banner ${index + 1}`}
              priority={index === 0}
              className="w-full object-cover h-[120px] md:h-fit"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-black/20" />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
