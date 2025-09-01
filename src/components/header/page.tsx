'use client';
import { IoCall, IoLocationOutline } from 'react-icons/io5';
import { FaSignInAlt, FaUserPlus, FaRegHeart } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import product from '../../assets/slick3.jpeg';

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          className={`z-50 w-full bg-white transition-shadow duration-300 scroll-smooth ${
            isSticky ? 'fixed top-0 shadow-lg' : 'relative'
          }`}
        >
          <div className="bg-white py-2 md:py-3 border-b border-gray-300">
            <div className="md:container px-4 mx-auto flex justify-between items-center">
              {/* Logo */}
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  className="w-40 md:w-52 object-contain"
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
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer z-50"
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
                      0
                    </span>
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content menu z-50 absolute top-5 right-[-50px] p-2 w-80"
                  >
                    <div className="bg-white rounded-md shadow p-4 font-sans text-gray-800">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="w-20 h-20 relative cursor-pointer">
                            <Image
                              src={product}
                              alt="Product"
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="text-sm cursor-pointer">
                            <h2 className="font-semibold text-base leading-5">
                              Bata Digital Gift Card
                            </h2>
                            <p className="text-xs text-gray-600">15000TK</p>
                            <p className="text-xs text-gray-400 italic mt-1">
                              · Tk. 15000 / Black /<br /> #MPC#525
                            </p>
                            <p className="text-sm mt-1">
                              1 x{' '}
                              <span className="font-semibold">
                                Tk 12,000.00
                              </span>
                            </p>
                          </div>
                        </div>
                        <button className="cursor-pointer text-xl font-bold text-gray-600 hover:text-[#D6A74E]">
                          ×
                        </button>
                      </div>

                      <hr className="my-4 border-gray-300" />
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span>Total:</span>
                        <span className="text-lg">Tk 12,000.00</span>
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <button className="bg-[#D6A74E] hover:bg-[#e9ad3e] text-white font-semibold py-2 rounded cursor-pointer">
                          CHECK OUT NOW
                        </button>
                        <button className="border border-gray-400 hover:border-black text-black py-2 rounded font-semibold cursor-pointer">
                          VIEW CART
                        </button>
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
          <div
            className={`flex justify-center items-center my-1 md:my-3 px-2 md:hidden ${
              isSticky ? 'hidden' : ''
            }`}
          >
            <form action="" className=" relative w-2/3">
              <input
                type="text"
                placeholder="Search your products"
                className="w-full pl-2 py-1 px-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6A74E] placeholder-gray-500 text-gray-900"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 flex items-center text-gray-600 cursor-pointer z-50"
              >
                <AiOutlineSearch className="w-6 h-6" />
              </button>
            </form>

            <div className="text-gray-800 flex ml-3 items-center hover:text-[#D6A74E] cursor-pointer text-sm">
              <span className="mr-1">Track Order</span>
              <IoLocationOutline />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden sm:block w-full bg-white shadow-sm">
        <ul className="flex justify-center items-center text-sm uppercase font-medium py-3 tracking-wide">
          {/* HOME */}
          <li className="relative group text-gray-800 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            HOME
          </li>

          {/* MEGA DEALS (dropdown) */}
          <li className="relative group text-gray-800 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            <span className="inline-flex items-center cursor-pointer">
              MEGA DEALS
            </span>
            {/* Hover buffer + submenu */}
            <div className="absolute left-[-10px] top-full pt-2 z-50">
              <ul className="hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 border border-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Deal 1
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Deal 2
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Deal 3
                </li>
              </ul>
            </div>
          </li>

          {/* BRAND */}
          <li className="relative group text-gray-800 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            BRAND
          </li>

          {/* MEN (dropdown) */}
          <li className="relative group text-gray-800 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            <span className="inline-flex items-center">MEN</span>
            <div className="absolute left-[-10px] top-full pt-2 z-50">
              <ul className="hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 border border-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Shirts
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Pants
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Shoes
                </li>
              </ul>
            </div>
          </li>

          {/* WOMEN (dropdown) */}
          <li className="relative group text-gray-800 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            <span className="inline-flex items-center">WOMEN</span>
            <div className="absolute left-[-10px] top-full pt-2 z-50">
              <ul className="hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 border border-gray-200 transition">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Dresses
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Bags
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Shoes
                </li>
              </ul>
            </div>
          </li>

          {/* CHILDREN */}
          <li className="relative group text-gray-800 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            CHILDREN
          </li>

          {/* ACCESSORIES */}
          <li className="relative group text-gray-800 hover:text-[#D6A74E] font-semibold pr-6 mr-6 border-r border-gray-400 last:border-none last:mr-0 last:pr-0 cursor-pointer">
            ACCESSORIES
          </li>
        </ul>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`sm:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-linear ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="text-gray-800 text-right w-full p-4 text-lg"
          onClick={() => setDrawerOpen(false)}
        >
          ✕ Close
        </button>
        <ul className="flex flex-col gap-4 px-4 text-lg uppercase font-medium">
          <li className="hover:text-[#D6A74E]">HOME</li>

          <li>
            <details>
              <summary className="hover:text-[#D6A74E] cursor-pointer">
                MEGA DEALS
              </summary>
              <ul className="pl-6 text-base">
                <li className="py-1">Deal 1</li>
                <li className="py-1">Deal 2</li>
                <li className="py-1">Deal 3</li>
              </ul>
            </details>
          </li>

          <li className="hover:text-[#D6A74E]">BRAND</li>

          <li>
            <details>
              <summary className="hover:text-[#D6A74E] cursor-pointer">
                MEN
              </summary>
              <ul className="pl-6 text-base">
                <li className="py-1">Shirts</li>
                <li className="py-1">Pants</li>
                <li className="py-1">Shoes</li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="hover:text-[#D6A74E] cursor-pointer">
                WOMEN
              </summary>
              <ul className="pl-6 text-base">
                <li className="py-1">Dresses</li>
                <li className="py-1">Bags</li>
                <li className="py-1">Shoes</li>
              </ul>
            </details>
          </li>

          <li className="hover:text-[#D6A74E]">CHILDREN</li>
          <li className="hover:text-[#D6A74E]">ACCESSORIES</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
