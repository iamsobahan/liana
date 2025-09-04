'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import dynamic from 'next/dynamic';
import slick1 from '../../assets/slick1.jpeg';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import slick from '../../assets/slick.jpeg';
import Link from 'next/link';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

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

type FeaturePageProps = {
  feature: { image: string }[]; // Replace `any` with your real type
  title: string;
};

const FeaturePage = ({ feature, title }: FeaturePageProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalRef2 = useRef<HTMLDialogElement>(null);

  const [selectedSize, setSelectedSize] = useState('M(28-30)');
  const [selectedColor, setSelectedColor] = useState('Red/Black');
  const [quantity, setQuantity] = useState(1);

  const pricePerItem = 1500;
  const totalPrice = pricePerItem * quantity;

  const sizes = ['M(28-30)', 'L(32-34)', 'XL(36-38)', '2XL(38-42)'];
  const colors = ['Red/Black', 'Blue/Navy', 'Gray/White'];
  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const showModal2 = () => {
    if (modalRef2.current) {
      modalRef2.current.showModal();
    }
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div className="container mx-auto my-2 md:my-10 px-4">
      {/* model box pop up 2  */}

      <dialog id="my_modal_1" ref={modalRef2} className="modal">
        {/* Modal Box */}

        <div className="bg-white rounded-xl shadow-lg max-w-md  mx-3 md:mx-0 md:width-full text-gray-800">
          <div className="modal-action mr-5">
            <form method="dialog">
              <button className="text-gray-500  text-2xl font-semibold leading-none cursor-pointer">
                X
              </button>
            </form>
          </div>
          {/* Success Icon & Title */}
          <div className="flex flex-col items-center p-6">
            <AiOutlineCheckCircle className="text-[#00C851] text-5xl mb-2" />
            <h2 className="text-lg md:text-2xl font-semibold text-[#00C851]">
              Item added to your cart!
            </h2>
          </div>

          {/* Product Info */}
          <div className="flex items-center gap-4   px-6 py-4">
            <Image
              src={slick} // Replace with your product image
              alt="Product"
              width={80}
              height={80}
              className="rounded-lg object-cover border"
            />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-800">
                Gazi Smiss Infrared Cooker IF-HL01
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Price:
                <span className="text-lg font-bold ml-3 text-gray-800">
                  {' '}
                  ৳6,547.20{' '}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 px-6 py-4">
            <button className="flex-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md py-2 cursor-pointer font-medium">
              Back to Shopping
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white cursor-pointer transition rounded-md py-2 font-medium text-center">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </dialog>

      {/* model 1 */}

      <dialog
        id="my_modal"
        ref={modalRef}
        className="rounded-lg mt-7 p-0 mx-auto overflow-y-scroll"
      >
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Price Details</h2>
            <div className="modal-action pt-0 mt-0">
              <form method="dialog">
                <button className="text-[#D6A74E] hover:text-[#f6c262] text-2xl font-semibold leading-none cursor-pointer">
                  X
                </button>
              </form>
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src={slick1}
                alt="Mens Premium Trouser"
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Mens Premium Trouser - {selectedColor}
                </h3>
                <p className="text-gray-500 mt-1">Premium Quality Fabric</p>

                {/* Color Selection */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Color
                  </p>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded-full border text-sm ${
                          selectedColor === color
                            ? 'bg-yellow-500 text-white border-yellow-500'
                            : 'border-gray-300 text-gray-700 hover:border-yellow-500'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Choose Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded-md border text-sm ${
                          selectedSize === size
                            ? 'bg-yellow-500 text-white border-yellow-500'
                            : 'border-gray-300 text-gray-700 hover:border-yellow-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center gap-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Quantity
                  </p>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() =>
                        setQuantity((q: number) => Math.max(1, q - 1))
                      }
                      className="px-3 text-3xl font-semibold py-1 text-gray-800 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-gray-800 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q: number) => q + 1)}
                      className="px-3 text-3xl font-semibold py-1 text-gray-800 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 border-t pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Total:
                </span>
                <span className="text-xl font-bold text-yellow-600">
                  Tk {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end p-5 border-t border-gray-200">
            <button
              onClick={showModal2}
              className="cursor-pointer px-6 py-2 rounded-md bg-gray-800 hover:bg-gray-950 text-white font-semibold shadow"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </dialog>
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
            <div key={idx} className="px-1 md:px-2 cursor-pointer">
              <div className="bg-white shadow-md rounded-sm overflow-hidden hover:shadow-lg border-gray-100 transition">
                <Link href="/product">
                  <div className="relative h-32 md:h-60 w-full">
                    <Image
                      src={item.image}
                      alt={`Product ${idx + 1}`}
                      priority
                      fill
                      className="rounded-tr-sm  object-cover h-[120px] w-[400px] md:h-[240px] md:w-[500px]"
                    />
                  </div>
                  <div className="mt-0.5 md:mt-2 md:p-1 text-center">
                    <h4 className="font-raleway md:font-semibold text-md md:text-lg text-gray-800">
                      Women Denim Jewelry - Skythread
                    </h4>
                    <p className="text-sm text-red-500 mt-2 bg-yellow-100 px-2 py-1 inline-block rounded font-bold">
                      Save TK 540
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="line-through text-gray-500 mr-1">
                        ৳2500
                      </span>
                      <span className="text-black font-bold">৳1900</span>
                    </div>
                  </div>
                </Link>
                <div
                  className="bg-gray-900 hover:bg-gray-950 transition text-white text-center py-1 mt-2 md:mt-0 pt-1 md:pt-3 font-medium md:font-semibold font-raleway cursor-pointer"
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
