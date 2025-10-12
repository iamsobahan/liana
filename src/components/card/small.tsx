"use client";
import config from "@/config";

import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type IProps = {
  item: IProduct;
};
const SmallProductCard: FC<IProps> = ({ item }) => {
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
                  alt={item.name}
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
                ৳{item.salePrice}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SmallProductCard;
