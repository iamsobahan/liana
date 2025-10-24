"use client";
import { IoCall, IoLocationOutline } from "react-icons/io5";
import { FaSignInAlt, FaUserPlus, FaRegHeart } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import { ICategory } from "@/types/category";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import config from "@/config";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import { ICartItem } from "@/types/cart";

type IProps = {
  categories: ICategory[];
};

const Header = ({ categories }: IProps) => {
  const { cart: cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRemoveFromCart = (item: ICartItem) => {
    dispatch(removeFromCart(item));
  };
  const cartCount = cartItems?.length || 0;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full bg-gray-100 text-gray-800">
      {/* Top Header */}
      <div>
        <header className="md:px-4 md:container mx-auto py-0 md:py-2 flex justify-between items-center text-xs sm:text-sm">
          <div className="hidden lg:flex items-center gap-0 font-medium text-gray-800">
            <IoCall />
            <span className="uppercase font-medium text-[13px]">
              <a href="tel:+8801999498887">+8801999498887</a>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-gray-800 font-medium">
            <div className="flex items-center gap-1 hover:text-[#D6A74E] cursor-pointer">
              <IoLocationOutline />
              <span>Track Order</span>
            </div>
            <span className="cursor-pointer hover:text-[#D6A74E]">Help</span>
            <div className="flex items-center gap-1 hover:text-[#D6A74E] cursor-pointer">
              <FaSignInAlt />
              <span>Login</span>
            </div>
            <div className="flex items-center gap-1 hover:text-[#D6A74E] cursor-pointer">
              <FaUserPlus />
              <span>Register</span>
            </div>
          </div>
        </header>

        {/* Sticky Navbar */}
        <div
          className={`z-40 w-full bg-white transition-shadow duration-300 scroll-smooth`}
        >
          <div
            className={`bg-white py-1.5 md:py-0 border-b border-gray-300  ${
              isSticky
                ? "fixed top-0 shadow-lg w-full z-40 transition-all duration-300"
                : "relative"
            }`}
          >
            <div className="md:container px-4 mx-auto flex justify-between items-center">
              {/* Logo */}
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  priority
                  className="w-30 md:w-42 object-contain"
                />
              </Link>

              {/* Search */}
              <div className="hidden md:block w-[600px] bg-white px-4 py-3">
                <form action="" className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search your products"
                    className="w-full pl-4 pr-10 py-2 md:py-2 border border-gray-400 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6A74E] placeholder-gray-500 text-gray-900"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer z-40"
                  >
                    <AiOutlineSearch className="w-6 h-6" />
                  </button>
                </form>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <div className="relative cursor-pointer">
                  <FaRegHeart className="text-gray-800 text-xl" />
                  <span className="absolute -top-2 -right-2 bg-[#D6A74E] text-xs px-1 rounded-full text-white">
                    0
                  </span>
                </div>

                {/* Cart Dropdown */}
                <div className="dropdown dropdown-hover">
                  <div className="relative cursor-pointer">
                    <BsCartCheckFill className="text-gray-800 text-xl cursor-pointer" />
                    <span className="absolute -top-2 -right-2 bg-[#D6A74E] text-xs px-1 rounded-full text-white cursor-pointer">
                      {cartCount}
                    </span>
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content menu z-40 absolute top-5 right-[-50px] p-2 w-80"
                  >
                    <div className="bg-white rounded-md shadow p-4 font-sans text-gray-800">
                      {cartItems.length === 0 && (
                        <p className="text-center">No items in the cart</p>
                      )}
                      {cartItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-start mb-1"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-20 h-20 relative cursor-pointer">
                              <Image
                                src={`${config.API_URL}/images/products/${item.image}`}
                                alt="Product"
                                className="object-cover rounded"
                                width={80}
                                height={80}
                              />
                            </div>
                            <div className="text-sm cursor-pointer">
                              <h2 className="font-semibold text-base leading-5">
                                {item.title}
                              </h2>
                              <p className="text-xs text-gray-600">
                                {item.price}TK
                              </p>
                              <p className="text-sm mt-1">
                                {item.quantity} x{" "}
                                <span className="font-semibold">
                                  Tk {item.price}
                                </span>
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item)}
                            className="cursor-pointer text-xl font-bold text-gray-600 hover:text-[#D6A74E]"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <hr className="my-4 border-gray-300" />
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span>Total:</span>
                        <span className="text-lg">
                          Tk {totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <Link
                          href="/cart"
                          className="border border-gray-400 hover:border-black text-black py-2 rounded font-semibold cursor-pointer text-center hover:bg-gray-100 transition"
                        >
                          VIEW CART
                        </Link>
                        <Link
                          href="/checkout"
                          className="bg-[#D6A74E] text-white text-center py-2 rounded font-semibold hover:bg-[#bf8e3c] transition"
                        >
                          CHECK OUT NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drawer Toggle */}
                <button
                  onClick={() => setDrawerOpen(!isDrawerOpen)}
                  className="sm:hidden"
                >
                  <HiMenu className="text-2xl text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          {/* <div
            className={`flex justify-center items-center my-1 md:my-3 px-2 md:hidden `}
          >
            <form action="" className=" relative w-3/5">
              <input
                type="text"
                placeholder="Search your products"
                className="w-full pl-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6A74E] placeholder-gray-500 text-gray-900"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 flex items-center text-gray-600 cursor-pointer z-40"
              >
                <AiOutlineSearch className="w-5 h-5" />
              </button>
            </form>

            <div className="text-gray-800 flex ml-3 items-center hover:text-[#D6A74E] cursor-pointer text-sm">
              <span className="mr-1">Track Order</span>
              <IoLocationOutline />
            </div>
          </div> */}
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden sm:block w-full bg-white shadow-sm">
        <ul className="flex justify-center items-center text-sm uppercase font-medium py-3 tracking-wide">
          <li className="dropdown_parent relative group text-gray-800 z-10 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          {categories?.map((cat, key) => (
            <li
              key={key}
              className="dropdown_parent relative group text-gray-800 z-10 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer"
            >
              <Link href={`/categories/${cat.slug}`}>
                <span className="inline-flex items-center cursor-pointer">
                  {cat.name}{" "}
                  {!!cat.children.length && <IoIosArrowDown className="ml-1" />}
                </span>
              </Link>

              {/* 1st level dropdown */}

              {!!cat.children.length && (
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 border border-gray-200">
                  {cat.children.map((subCat, key) => (
                    <li
                      key={key}
                      className="dropdown_class relative group px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link href={`/categories/${subCat.slug}`}>
                        <span className="flex justify-between items-center cursor-pointer">
                          {subCat.name}
                          {!!subCat.children.length && (
                            <MdKeyboardArrowRight className="ml-1" />
                          )}
                        </span>
                      </Link>

                      {/* 2nd level dropdown */}
                      {!!subCat.children.length && (
                        <ul className="absolute left-full top-0 hidden bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 border border-gray-200">
                          {subCat.children.map((subSubCat, key) => (
                            <Link
                              href={`/categories/${subSubCat.slug}`}
                              key={key}
                            >
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {subSubCat.name}
                              </li>
                            </Link>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`sm:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-linear ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-gray-800 text-right w-full p-4 text-lg"
          onClick={() => setDrawerOpen(false)}
        >
          ✕ Close
        </button>

        <ul className="flex flex-col gap-4 px-4 text-lg uppercase font-medium overflow-y-auto h-[calc(100vh-250px)]">
          <li className="hover:text-[#D6A74E]">
            <Link href="/">HOME</Link>
          </li>
          {categories?.map((cat, key) => (
            <li key={key} className="hover:text-[#D6A74E]">
              <details>
                <summary className="hover:text-[#D6A74E] cursor-pointer">
                  <Link href={`/categories/${cat.slug}`}>{cat.name}</Link>
                </summary>
                <ul className="pl-6 text-base">
                  {cat.children.map((subCat, key) => (
                    <li key={key}>
                      <details>
                        <summary className="hover:text-[#D6A74E] cursor-pointer">
                          {subCat.name}
                        </summary>
                        <ul className="pl-6 text-base">
                          {subCat.children.map((subSubCat, key) => (
                            <li key={key} className="py-1">
                              <Link href={`/categories/${subSubCat.slug}`}>
                                {subSubCat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
