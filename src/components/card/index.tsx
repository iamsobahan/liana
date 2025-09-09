"use client";
import config from "@/config";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FC } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
type IProps = {
  item: IProduct;
};
const ProductCard: FC<IProps> = ({ item }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const modalRef2 = React.useRef<HTMLDialogElement>(null);
  const safeArea = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const sizes = ["M(28-30)", "L(32-34)", "XL(36-38)", "2XL(38-42)"];
  const colors = ["Red/Black", "Blue/Navy", "Gray/White"];
  const [selectedSize, setSelectedSize] = React.useState("M(28-30)");
  const [selectedColor, setSelectedColor] = React.useState("Red/Black");
  const [quantity, setQuantity] = React.useState(1);
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

  const handleAddToCart = (data: IProduct) => {
    const cardData = {
      productId: data.id,
      title: data.name,
      image: data.thumbnail,
      price: data.salePrice,
      regularPrice: data.regularPrice,
      quantity: quantity,
    };
    dispatch(addToCart(cardData));
    showModal2();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        safeArea.current &&
        !safeArea.current.contains(event.target as Node)
      ) {
        modalRef.current?.close();
        modalRef2.current?.close();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* model box pop up 2  */}

      <dialog id="my_modal_1" ref={modalRef2} className="modal">
        {/* Modal Box */}

        <div
          ref={safeArea}
          className="bg-white rounded-xl shadow-lg max-w-md  mx-3 md:mx-0 md:width-full text-gray-800"
        >
          <div className="modal-action mr-5">
            <form method="dialog">
              <button className="text-gray-500  text-2xl font-semibold leading-none cursor-pointer">
                <RxCross2 />
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
              src={`${config.API_URL}/images/products/${item?.thumbnail}`}
              alt="Product"
              width={80}
              height={80}
              className="rounded-lg object-cover border"
              loading="lazy"
            />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-800">
                Gazi Smiss Infrared Cooker IF-HL01
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Price:
                <span className="text-lg font-bold ml-3 text-gray-800">
                  {" "}
                  ৳6,547.20{" "}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 px-6 py-4">
            <button className="flex-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md py-2 cursor-pointer font-medium">
              Back to Shopping
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white cursor-pointer transition rounded-md py-2  font-medium text-center">
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
        <div ref={safeArea} className="bg-white rounded-lg overflow-hidden">
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
                src={`${config.API_URL}/images/products/${item?.thumbnail}`}
                alt={item.name}
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
                  Tk 13,500
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
      <div className="px-1 md:px-2 cursor-pointer">
        <div className="bg-white shadow-md rounded-sm overflow-hidden hover:shadow-lg border-gray-100 transition">
          <Link href={`/products/${item?.slug}`}>
            <div className="relative h-32 md:h-60 w-full">
              <Image
                src={`${config.API_URL}/images/products/${item?.thumbnail}`}
                width={400}
                height={140}
                alt={item.name}
                className="rounded-tr-sm  object-cover   md:h-[240px] md:w-[500px]"
              />
            </div>
            <div className="mt-0.5 md:mt-2 md:p-1 text-center">
              <h4 className="truncate font-raleway md:font-semibold text-md md:text-lg text-gray-800">
                {item.name}
              </h4>
              <p className="text-sm text-red-500 mt-2 bg-yellow-100 px-2 py-1 inline-block rounded font-bold">
                Save TK {item.regularPrice - item.salePrice}
              </p>
              <div className="mt-2 text-sm">
                <span className="line-through text-gray-500 mr-1">
                  ৳{item.regularPrice}
                </span>
                <span className="text-black font-bold">৳{item.salePrice}</span>
              </div>
            </div>
          </Link>
          <div
            className="bg-gray-900 hover:bg-gray-950 transition text-white text-center py-1 mt-2 md:mt-0 pt-1 md:pt-3 font-medium md:font-semibold font-raleway cursor-pointer"
            onClick={() => handleAddToCart(item)}
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
    </>
  );
};

export default ProductCard;
