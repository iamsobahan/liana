"use client";
import config from "@/config";

import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

type IProps = {
  item: IProduct;
};
const SmallProductCard: FC<IProps> = ({ item }) => {
  const [price, setPrice] = useState<number>(item.salePrice);
  useEffect(() => {
    if (!item) return;

    let newPrice = item.salePrice || 0;

    // Handle sizes
    if (Array.isArray(item.sizes) && item.sizes.length > 0) {
      const firstSize = item.sizes[0];
      newPrice += firstSize?.price || 0;
    }

    // Handle boxes
    if (Array.isArray(item.boxes) && item.boxes.length > 0) {
      const selectedBoxItem =
        item.boxes.find((box) => box.isSelected) || item.boxes[0];
      newPrice += selectedBoxItem?.price || 0;
    }

    setPrice(newPrice);
  }, [item]);

  return (
    <>
      <div className="px-1 md:px-2 pb-5 cursor-pointer">
        <div className="relative overflow-visible hover:shadow-lg transition">
          <Link href={`/products/${item?.slug}`} className="block">
            <div className="rounded-sm overflow-hidden">
              {/* explicit size wrapper for next/image */}
              <div className="relative w-[240px] h-[120px] md:w-[500px] md:h-[240px]">
                <Image
                  src={`${config.API_URL}/images/products/${item?.thumbnail}`}
                  alt={item.name ?? "Product Image"}
                  className="object-cover"
                  width={250}
                  height={120}
                  quality={90}
                />
              </div>
            </div>
          </Link>

          {/* price tag — half inside, half outside */}
          <Link
            href={`/products/${item?.slug}`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50"
          >
            <div className="bg-[#FFFFFF] backdrop-blur-sm border border-gray-200 rounded-sm px-2 flex items-center gap-2 shadow-md">
              <span className="line-through text-gray-500 text-sm">
                ৳{item.regularPrice}
              </span>
              <span className="text-black font-semibold text-lg">
                ৳{Math.ceil(price)}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SmallProductCard;
