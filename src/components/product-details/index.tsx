"use client";
import { useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface SizeOption {
  label: string;
  value: string;
}

import { IProduct } from "@/types/product";
import config from "@/config";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { ICartItem } from "@/types/cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  product: IProduct;
};

export default function ProductInfo({ product }: Props) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(
    `${config.API_URL}/images/products/${product.galleryImages[0]}`
  );
  const router = useRouter();
  const sizes: SizeOption[] = [
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "2XL", value: "2XL" },
  ];

  const handleQuantity = (type: "inc" | "dec") => {
    setQuantity((prev) => {
      if (type === "dec" && prev > 1) return prev - 1;
      if (type === "inc") return prev + 1;
      return prev;
    });
  };
  const handleAddToCart = () => {
    const item: ICartItem = {
      productId: product.id,
      title: product.name,
      price: product.salePrice,
      regularPrice: product.regularPrice,
      quantity,
      image: product.galleryImages[0],
    };
    dispatch(addToCart(item));
    toast.success("Product added to cart");
  };

  const handleBuyNow = () => {
    const item: ICartItem = {
      productId: product.id,
      title: product.name,
      price: product.salePrice,
      regularPrice: product.regularPrice,
      quantity,
      image: product.galleryImages[0],
    };
    dispatch(addToCart(item));
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {/* LEFT: IMAGE + GALLERY */}
      <div>
        {/* Main Image with Zoom on Hover */}
        <div className="relative overflow-hidden group border rounded-lg">
          <Zoom>
            <Image
              src={selectedImage}
              alt="Product"
              width={500}
              height={500}
              className="object-contain w-full transition-transform duration-300 ease-in-out group-hover:scale-125 max-h-[350px]"
              priority
            />
          </Zoom>
        </div>

        {/* Gallery Thumbnails */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {product.galleryImages.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedImage(`${config.API_URL}/images/products/${item}`)
              }
              className={`border-2 ${
                selectedImage === `${config.API_URL}/images/products/${item}`
                  ? "border-black"
                  : "border-transparent"
              } rounded-md overflow-hidden`}
            >
              <Image
                src={`${config.API_URL}/images/products/${item}`}
                alt={`product ${index + 1}`}
                width={70}
                height={70}
                className="object-cover w-[70px] h-[70px]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: DETAILS */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug">
          {product.name}
        </h1>

        <div>SKU: {product.sku}</div>

        {/* Price */}
        <div className="mt-3 sm:mt-4 flex items-center gap-3">
          <h3>Price:</h3>
          <span className="text-gray-400 line-through text-base sm:text-lg">
            ৳{product.regularPrice}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-green-600">
            ৳{product.salePrice}
          </span>
        </div>
        {/* Short Description */}
        <div className="mt-5 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
          {product.shortDescription}
        </div>

        {/* Sizes */}
        <div className="mt-5 sm:mt-6">
          <h3 className="text-sm font-semibold text-gray-600">Select Size:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={`px-4 py-2 border rounded-md font-semibold text-sm transition-all ${
                  selectedSize === size.value
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Actions */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleQuantity("dec")}
              className="px-3 py-2 text-xl text-gray-800 font-bold hover:bg-gray-100"
            >
              −
            </button>
            <span className="px-4 text-gray-800 font-semibold py-2">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantity("inc")}
              className="px-3 py-2 text-xl font-bold text-gray-800 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center flex-1 px-2 md:px-4 py-2 bg-black text-white rounded-md font-semibold shadow hover:bg-gray-800 transition text-sm"
          >
            ＋ Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center flex-1  gap-2 px-2 md:px-4 py-2 bg-yellow-600 text-white rounded-md font-semibold shadow hover:bg-yellow-500 transition text-sm"
          >
            Buy Now
          </button>

          <Link href={`https://wa.me/qr/EQ5A6SDYHL2IP1`}>
            <button className="flex items-center justify-center flex-1 min-w-[120px] gap-2 px-4 py-2 bg-green-700 text-white rounded-md font-semibold shadow hover:bg-green-600 transition text-sm">
              <FaWhatsapp size={16} /> WhatsApp
            </button>
          </Link>
        </div>

        {/* Specs */}
        {/*  <div className="mt-5 sm:mt-6 text-sm text-gray-700 space-y-1">
          <p>
            <strong>Fabric type:</strong> Double PK
          </p>
          <p>
            <strong>Composition:</strong> 80% cotton + 20% polyester
          </p>
          <p>
            <strong>GSM:</strong> 210-220
          </p>
        </div> */}
      </div>
    </div>
  );
}
