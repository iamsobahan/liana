"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import config from "@/config";
import { RxCross2 } from "react-icons/rx";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    thumbnail: string;
  };
  colors: string[];
  sizes: string[];
}

export default function ProductModal({
  isOpen,
  onClose,
  item,
  colors,
  sizes,
}: ProductModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const safeArea = useRef<HTMLDivElement | null>(null);

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  // Open/close modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen && !modal.open) {
      modal.showModal();
    } else if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (safeArea.current && !safeArea.current.contains(e.target as Node)) {
        onClose();
      }
    };

    modal.addEventListener("click", handleOutsideClick);
    return () => modal.removeEventListener("click", handleOutsideClick);
  }, [onClose]);

  return (
    <dialog ref={modalRef} className="modal">
      <div
        ref={safeArea}
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl  modal-box"
      >
        {/* Close button */}
        <div className="modal-action">
          <form method="dialog">
            <button
              type="button"
              className="text-gray-500 text-2xl font-semibold leading-none cursor-pointer"
              onClick={onClose}
            >
              <RxCross2 />
            </button>
          </form>
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={`${config.API_URL}/images/products/${item?.thumbnail}`}
              alt={item.name}
              width={300}
              height={200}
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name} - {selectedColor}
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
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        selectedColor === color
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "border-gray-300 text-gray-700 hover:border-yellow-500"
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
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded-md border text-sm ${
                        selectedSize === size
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "border-gray-300 text-gray-700 hover:border-yellow-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center gap-4">
                <p className="text-sm font-semibold text-gray-700">Quantity</p>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 text-3xl font-semibold py-1 text-gray-800 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-gray-800 font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
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
                Tk {quantity * 13500}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end p-5 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              // Example: trigger add to cart
              console.log({
                item,
                color: selectedColor,
                size: selectedSize,
                quantity,
              });
              onClose();
            }}
            className="cursor-pointer px-6 py-2 rounded-md bg-gray-800 hover:bg-gray-950 text-white font-semibold shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </dialog>
  );
}
