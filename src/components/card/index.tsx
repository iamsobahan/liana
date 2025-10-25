"use client";
import config from "@/config";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import AddToCartModal from "../modal/addToCartModal";
import ProductModal from "../modal/productModal";
type IProps = {
  item: IProduct;
};
const ProductCard: FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [price, setPrice] = useState<number>(item?.salePrice || 0);

  const handleAddToCart = (data: IProduct) => {
    if (
      (data.sizes && data.sizes?.length > 0) ||
      (data.boxes && data.boxes?.length > 0)
    ) {
      setShowProductModal(true);
    } else {
      const cardData = {
        productId: data.id,
        title: data.name,
        image: data.thumbnail,
        price: data.salePrice,
        regularPrice: data.regularPrice,
        quantity: 1,
      };
      dispatch(addToCart(cardData));
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (!item) return;

    let newPrice = item.salePrice || 0; // 👈 start from salePrice

    // Handle sizes
    if (Array.isArray(item.sizes) && item.sizes.length > 0) {
      const firstSize = item.sizes[0];
      newPrice = firstSize?.price || 0;
    }
    // Handle boxes
    if (Array.isArray(item.boxes) && item.boxes.length > 0) {
      const selectedBoxItem =
        item.boxes.find((box) => box.isSelected) || item.boxes[0];
      console.log(selectedBoxItem);
      newPrice += selectedBoxItem?.price || 0;
    }

    setPrice(newPrice);
  }, [item]);

  return (
    <>
      {/* model box pop up 2  */}

      <AddToCartModal
        item={item}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        price={price}
      />

      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={item}
      />

      <div className="px-1 md:px-2 cursor-pointer">
        <div className="bg-white shadow-md rounded-sm overflow-hidden hover:shadow-lg border-gray-100 transition">
          <Link href={`/products/${item?.slug}`}>
            <div className="relative h-32 md:h-60 w-full">
              <Image
                src={`${config.API_URL}/images/products/${item?.thumbnail}`}
                width={400}
                height={400}
                alt={item.name ?? "Product Image"}
                className="rounded-tr-sm  object-cover w-full h-full"
                quality={90}
              />
            </div>
            <div className="mt-0.5 md:mt-2 md:p-1 text-center">
              <h4 className="truncate font-raleway md:font-semibold text-md md:text-lg text-gray-800">
                {item.name}
              </h4>
              <p className="text-sm text-red-500 mt-2 bg-yellow-100 px-2 py-1 inline-block rounded font-bold">
                Save TK {Math.ceil(item.regularPrice - price)}
              </p>
              <div className="mt-2 text-sm">
                <span className="line-through text-gray-500 mr-1">
                  ৳{item.regularPrice}
                </span>
                <span className="text-black font-bold text-lg">
                  ৳{Math.ceil(price)}
                </span>
              </div>
            </div>
          </Link>
          <div
            className="bg-gray-900 hover:bg-gray-950 transition text-white text-center py-1 mt-2 md:mt-0 pt-1 md:pt-3 font-medium md:font-semibold font-raleway cursor-pointer"
            onClick={() => handleAddToCart(item)}
          >
            <span className="inline-flex items-center justify-center gap-1">
              <IoCartOutline size={20} />
              ADD TO CART
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
