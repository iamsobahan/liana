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
    let finalPrice = item.salePrice;
    if (item.box && item.box.sellingPrice) {
      finalPrice += item.box.sellingPrice;
    }
    setPrice(finalPrice);
  }, [item]);

  return (
    <>
      <div className="px-1 md:px-2 pb-5 cursor-pointer">
        <div className="relative overflow-visible hover:shadow-lg transition">
          <Link href={`/products/${item?.slug}`} className="block">
            <div className="rounded-sm overflow-hidden">
              {/* explicit size wrapper for next/image */}
              <div className="relative w-full object-cover">
                <Image
                  src={`${config.API_URL}/images/products/${item?.thumbnail}`}
                  alt={item.name ?? "Product Image"}
                  className="object-cover w-full h-full"
                  width={250}
                  height={250}
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
