"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";
import Link from "next/link";

import { IProduct } from "@/types/product";
import config from "@/config";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { ICartItem } from "@/types/cart";
import { useRouter } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddToCartModal from "../modal/addToCartModal";

type Props = {
  product: IProduct;
};

export default function ProductInfo({ product }: Props) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedBox, setSelectedBox] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState<number>(product.salePrice);
  const [selectedImage, setSelectedImage] = useState<string>(
    `${config.API_URL}/images/products/${product.galleryImages[0]}`
  );
  const router = useRouter();

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
      price: price,
      regularPrice: product.regularPrice,
      quantity,
      image: product.galleryImages[0],
      size: selectedSize || null,
      box: selectedBox || null,
    };
    dispatch(addToCart(item));
    setIsModalOpen(true);
  };

  const handleBuyNow = () => {
    const item: ICartItem = {
      productId: product.id,
      title: product.name,
      price: price,
      regularPrice: product.regularPrice,
      quantity,
      image: product.galleryImages[0],
      size: selectedSize || null,
      box: selectedBox || null,
    };
    dispatch(addToCart(item));
    router.push("/checkout");
  };
  useEffect(() => {
    let newPrice = 0;
    if (selectedBox) {
      const boxItem = product.boxes?.find((box) => box.box.id === selectedBox);
      newPrice = boxItem?.price as number;
    }
    if (selectedSize) {
      const sizeItem = product.sizes?.find((size) => size._id === selectedSize);
      newPrice += sizeItem ? sizeItem.price : 0;
    } else {
      newPrice += product.salePrice;
    }
    if (newPrice === 0) {
      newPrice = product.salePrice;
    }
    setPrice(newPrice);
  }, [selectedBox, selectedSize, product]);

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]._id);
    }
    if (product.boxes && product.boxes.length > 0) {
      const boxItem = product.boxes.findIndex((box) => box.isSelected);
      if (boxItem !== -1) {
        setSelectedBox(product.boxes[boxItem].box.id);
        return;
      }
      setSelectedBox(product.boxes[0].box.id);
    }
  }, [product.sizes, product.boxes]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      <AddToCartModal
        item={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price={price}
      />
      {/* LEFT: IMAGE + GALLERY */}
      <div>
        <div>
          <TransformWrapper>
            <TransformComponent>
              <Image
                src={selectedImage}
                decoding="async"
                className="rounded-md border border-gray-100 cursor-alias"
                alt={product.name}
                width={800}
                height={800}
              />
            </TransformComponent>
          </TransformWrapper>
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
            ৳{price}
          </span>
        </div>
        {/* Short Description */}
        <div className="mt-5 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
          {product.shortDescription}
        </div>

        {/* Step 1: Show Boxes if With Box */}
        {(product?.boxes?.length ?? 0) > 0 && (
          <div className="mt-5 sm:mt-6">
            <h3 className="text-sm font-semibold text-gray-600">
              {product.boxTitle ?? "Select Box"}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product?.boxes?.map((boxItem) => (
                <div
                  key={boxItem.box.id}
                  className="tooltip"
                  data-tip={boxItem.box.name}
                >
                  <button
                    key={boxItem.box.id}
                    onClick={() => setSelectedBox(boxItem.box.id)}
                    className={`border rounded-md font-semibold text-sm transition-all overflow-hidden ${
                      selectedBox === boxItem.box.id
                        ? "bg-black text-white border-yellow-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                  >
                    <Image
                      src={`${config.API_URL}/images/boxes/${boxItem.box.image}`}
                      alt={boxItem.box.name}
                      width={50}
                      height={50}
                      className="object-cover w-[50px] h-[50px]"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*step2: Sizes */}
        {(product?.sizes?.length ?? 0) > 0 && (
          <div className="mt-5 sm:mt-6">
            <h3 className="text-sm font-semibold text-gray-600">
              {product.sizeTitle ?? "Select Size :"}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product?.sizes?.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size._id)}
                  className={`px-4 py-2 border rounded-md font-semibold text-sm transition-all ${
                    selectedSize === size._id
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        )}

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
            className="flex items-center justify-center flex-1 px-2 md:px-4 py-2 bg-black text-white rounded-md font-semibold shadow hover:bg-gray-800 transition text-sm cursor-pointer min-w-[100px]"
          >
            ＋ Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center flex-1  gap-2 px-2 md:px-4 py-2 bg-yellow-600 text-white rounded-md font-semibold shadow hover:bg-yellow-500 transition text-sm cursor-pointer min-w-[100px]"
          >
            Buy Now
          </button>

          <Link href={`https://wa.me/qr/EQ5A6SDYHL2IP1`}>
            <button className="flex items-center justify-center flex-1 min-w-[120px] gap-2 px-4 py-2 bg-green-700 text-white rounded-md font-semibold shadow hover:bg-green-600 transition text-sm">
              <FaWhatsapp size={16} /> WhatsApp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
