"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import config from "@/config";
import { RxCross2 } from "react-icons/rx";
import { ICartItem } from "@/types/cart";
import { IProduct } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import AddToCartModal from "./addToCartModal";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
}: ProductModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const safeArea = useRef<HTMLDivElement | null>(null);
  const [price, setPrice] = useState<number>(product?.salePrice || 0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeId, setSizeId] = useState<string>("");
  const [selectedBox, setSelectedBox] = useState<string>(
    product?.box?.id || ""
  );
  const [isSelectError, setIsSelectError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setIsSelectError(true);
      return;
    }
    const item: ICartItem = {
      productId: product.id,
      title: product.name,
      price: price,
      regularPrice: product.regularPrice,
      quantity,
      image: product.thumbnail,
      size: selectedSize || null,
      box: selectedBox || null,
      sizeId: sizeId || null,
    };
    dispatch(addToCart(item));
    onClose();
    setShowModal(true);
  };
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

  useEffect(() => {
    let finalPrice = product.salePrice;
    if (selectedBox) {
      finalPrice += product.box?.sellingPrice || 0;
    }
    setPrice(finalPrice);
  }, [selectedBox, product]);

  return (
    <>
      <AddToCartModal
        item={product}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        price={price}
      />
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
                src={`${config.API_URL}/images/products/${product?.thumbnail}`}
                alt={product.name}
                width={300}
                height={200}
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                {/* <p className="text-gray-500 mt-1">Premium Quality Fabric</p> */}

                {/* Step 1: Show Boxes if With Box */}
                {product.box && product.box._id && (
                  <div className="mt-5 sm:mt-6">
                    <h3 className="text-sm font-semibold text-gray-600">
                      {product.boxTitle ?? "Select Box"}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        onClick={() => {
                          setSelectedBox(product.box.id);
                        }}
                        className={`px-4 py-2 border rounded-md font-semibold text-sm transition-all ${
                          selectedBox
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        with Box
                      </button>
                      <button
                        onClick={() => setSelectedBox("")}
                        className={`px-4 py-2 border rounded-md font-semibold text-sm transition-all ${
                          !selectedBox
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        without Box
                      </button>
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Select Sizes
                  </p>
                  <div className="flex gap-2">
                    {product.sizes && product.sizes.length > 0
                      ? product.sizes.map((size) => (
                          <button
                            key={size._id}
                            type="button"
                            onClick={() => {
                              setSelectedSize(size.name);
                              setSizeId(size._id);
                              setIsSelectError(false);
                            }}
                            className={`px-3 py-1 rounded-md border text-sm ${
                              selectedSize === size.name
                                ? "bg-yellow-500 text-white border-yellow-500"
                                : "border-gray-300 text-gray-700 hover:border-yellow-500"
                            }`}
                          >
                            {size.name}
                          </button>
                        ))
                      : null}
                  </div>
                </div>
                {isSelectError && (
                  <p className="text-red-500 text-sm mt-2">
                    Please select a size before adding to cart.
                  </p>
                )}

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center gap-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Quantity
                  </p>
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
                  Tk {quantity * price}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end p-5 border-t border-gray-200">
            <button
              type="button"
              onClick={handleAddToCart}
              className="cursor-pointer px-6 py-2 rounded-md bg-gray-800 hover:bg-gray-950 text-white font-semibold shadow"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
