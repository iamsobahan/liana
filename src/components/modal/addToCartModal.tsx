"use client";

import React, { useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import { IProduct } from "@/types/product";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IProduct;
  price?: number;
}

export default function AddToCartModal({
  isOpen,
  onClose,
  item,
  price,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const safeAreaRef = useRef<HTMLDivElement | null>(null);

  // Open/Close handling with native <dialog>
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    if (isOpen && !modal.open) {
      modal.showModal();
    } else if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);

  // Outside click close
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        safeAreaRef.current &&
        !safeAreaRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    modal.addEventListener("click", handleClickOutside);
    return () => modal.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <dialog ref={modalRef} className="modal">
      <div
        ref={safeAreaRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-xl  modal-box"
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

        {/* Success icon + message */}
        <div className="flex flex-col items-center px-2 md:p-6">
          <AiOutlineCheckCircle className="text-[#00C851] text-5xl mb-2" />
          <h2 className="text-lg md:text-2xl font-semibold text-[#00C851]">
            Item added to your cart!
          </h2>
        </div>

        {/* Product info */}
        <div className="flex items-center gap-2 md:gap-4 px-2 md:px-6 py-4">
          <Image
            src={`${config.API_URL}/images/products/${item?.thumbnail}`}
            alt="Product"
            width={80}
            height={80}
            className="rounded-lg object-cover border"
          />
          <div>
            <h3 className="whitespace-wrap text-sm md:text-base font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Price:
              <span className="text-lg font-bold ml-3 text-gray-800">
                ৳{price}
              </span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-2 md:px-6 gap-2 py-2 md:py-4">
          <Link
            href={"/"}
            className="flex-1 text-center border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md py-1 md:py-2 px-1 md:px-0 font-medium whitespace-nowrap"
          >
            Back to Shopping
          </Link>
          <Link
            href={"/checkout"}
            className="flex-1 bg-gray-800 border border-gray-800 hover:bg-gray-900 text-white transition rounded-md py-1 md:py-2 px-1 md:px-0 font-medium text-center whitespace-nowrap"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </dialog>
  );
}
