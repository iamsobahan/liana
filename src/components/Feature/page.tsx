'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

import slick from '../../assets/slick.jpeg';
import slick1 from '../../assets/slick1.jpeg';
import slick2 from '../../assets/slick2.jpeg';
import slick3 from '../../assets/slick3.jpeg';
import slick4 from '../../assets/slick4.jpeg';
import slick5 from '../../assets/slick5.jpeg';
import { setTimeout } from 'timers/promises';

const slides = [
  { image: slick },
  { image: slick1 },
  { image: slick2 },
  { image: slick3 },
  { image: slick4 },
  { image: slick5 },
];

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

const FeaturePage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
 const showModal = () => {
   if (modalRef.current) {
     modalRef.current.showModal();

    
   }
 };

  return (
    <div className="container mx-auto px-4">
      <dialog id="my_modal_1" ref={modalRef} className="modal">
        <div>
          <div className="w-full max-w-md mx-auto bg-white p-4 shadow-md rounded-md gap-4 items-start">
            {/* Left: Image */}
            <div className="modal-action pt-0 mt-0">
              <form method="dialog">
                <button className="text-[#D6A74E] hover:text-[#f6c262] text-2xl font-semibold leading-none cursor-pointer">
                  X
                </button>
              </form>
            </div>
            <div className="flex min-w-[80px]">
              <Image
                src={slick1}
                alt="Gift Card"
                className="rounded mr-3"
                width={80}
                height={80}
                style={{ objectFit: 'cover' }}
              />

              {/* Right: Content */}
              <div className="flex-1">
                <div className="items-start">
                  <h2 className="text-lg font-semibold cursor-pointer text-gray-900">
                    Bata Digital Gift Card 15000Tk
                  </h2>
                </div>

                <p className="text-sm text-gray-400 cursor-pointer italic mt-1">
                  Added to your shopping cart.
                </p>
              </div>
            </div>
            <div className="mt-3">
              <button className="flex cursor-pointer mb-1 items-center gap-1 text-sm font-semibold text-gray-800 hover:text-yellow-600 border-b-2 border-transparent hover:border-yellow-600 transition duration-150">
                CONTINUE SHOPPING →
              </button>
              <button className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-gray-800 hover:text-yellow-600 border-b-2 border-transparent hover:border-yellow-600 transition duration-150">
                VIEW CART →
              </button>
            </div>
          </div>
        </div>
      </dialog>
      {/* Feature title  */}
      <div className="text-center mb-5 md:mb-10">
        <h2 className="text-md md:text-2xl font-semibold text-gray-800 uppercase tracking-widest font-rajdhani animate-fade-in-down">
          Feature Products
        </h2>
        <span className="block h-[2px] w-32 mx-auto mt-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></span>
      </div>

      <div className="-mx-2">
        <Slider {...settings}>
          {slides.map((item, idx) => (
            <div key={idx} className="px-1 md:px-2 cursor-pointer">
              <div className="bg-white shadow-md rounded-sm overflow-hidden hover:shadow-lg border-gray-100 transition">
                <div className="relative h-32 md:h-60 w-full">
                  <Image
                    src={item.image}
                    alt={`Product ${idx + 1}`}
                    fill
                    className="rounded-tr-sm  object-cover h-[120px] w-[400px] md:h-[240px] md:w-[500px]"
                  />
                </div>
                <div className="mt-0.5 md:mt-2 md:p-1 text-center">
                  <h4 className="font-raleway md:font-semibold text-md md:text-lg text-gray-800">
                    Women Denim Jewelry - Skythread
                  </h4>
                  <p className="text-sm text-green-600 mt-2 bg-yellow-100 px-2 py-1 inline-block rounded font-bold">
                    Save TK 540
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="line-through text-gray-500 mr-1">
                      ৳2500
                    </span>
                    <span className="text-black font-bold">৳1900</span>
                  </div>
                </div>
                <div
                  className="bg-yellow-600 hover:bg-yellow-700 transition text-white text-center py-1 mt-2 md:mt-0 pt-1 md:pt-3 font-medium md:font-semibold font-raleway cursor-pointer"
                  onClick={showModal}
                >
                  <span className="inline-flex items-center justify-center gap-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m5-5v5m4-5v5m1 4a1 1 0 100-2 1 1 0 000 2zm-6 0a1 1 0 100-2 1 1 0 000 2z"
                      />
                    </svg>
                    ADD TO CART
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturePage;
