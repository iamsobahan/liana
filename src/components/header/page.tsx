'use client';
import { IoCall } from 'react-icons/io5';
import { FaBoxOpen, FaSignInAlt, FaUserPlus, FaRegHeart } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'HOME', active: true },
    { name: 'MEGA DEALS' },
    { name: 'BRAND' },
    { name: 'MEN' },
    { name: 'WOMEN' },
    { name: 'CHILDREN' },
    { name: 'ACCESSORIES' },
    { name: 'HELP' },
    { name: 'LOGIN' },
    { name: 'REGISTER' },
  ];

  return (
    <div className="w-full">
      {/* Top Header */}
      <div
        className={`z-50 w-full bg-white transition-shadow duration-300 md:${
          isSticky ? 'fixed top-0 shadow-lg' : 'relative'
        }`}
      >
        <header className="px-4 md:container mx-auto py-2 bg-gray-100 shadow flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-0 font-medium text-gray-800">
            <IoCall />
            <span className="uppercase font-medium text-[13px]">
              <a href="tel:+8801999498887">+8801999498887</a>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-gray-800 font-medium">
            <div className="flex items-center gap-1 hover:text-[#D6A74E] cursor-pointer">
              <FaBoxOpen />
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

          {/* Show only on small screens */}
          <div className="flex sm:hidden items-center gap-3">
            <div className="text-gray-800 flex items-center gap-1 hover:text-[#D6A74E] cursor-pointer text-sm">
              <FaBoxOpen />
              <span>Track Order</span>
            </div>
          </div>
        </header>
        <div className="bg-white shadow-sm py-3 border-b border-gray-300">
          <div className="md:container px-4 mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={160}
                height={60}
                className="object-contain"
              />
            </Link>

            <div className="hidden md:block w-[600px] bg-white px-4 py-3">
              <form action="" className="relative w-full">
                <input
                  type="text"
                  placeholder="Search your products"
                  className="w-full pl-4 pr-10 py-2 border border-gray-400 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6A74E] placeholder-gray-500 text-gray-900"
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
              <div className="relative cursor-pointer">
                <BsCartCheckFill className="text-gray-800 text-xl" />
                <span className="absolute -top-2 -right-2 bg-[#D6A74E] text-xs px-1 rounded-full text-white">
                  0
                </span>
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
        <div className="block md:hidden w-full bg-white px-4 py-3">
          <form action="" className="relative w-full">
            <input
              type="text"
              placeholder="Search your products"
              className="w-full pl-4 pr-10 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6A74E] placeholder-gray-500 text-gray-900"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer z-50"
            >
              <AiOutlineSearch className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Logo + Icons */}

      {/* Search Box */}

      {/* Desktop Menu */}
      <nav className="hidden sm:block w-full bg-white shadow-sm">
        <ul className="flex justify-center items-center space-x-5 text-sm uppercase font-medium py-3 tracking-wide">
          {menuItems.slice(0, 7).map((item, index) => (
            <li
              key={item.name}
              className="flex text-base items-center space-x-6"
            >
              {index !== 0 && (
                <span className="text-gray-400 text-base">|</span>
              )}
              <span className="cursor-pointer text-gray-800 hover:text-[#D6A74E] font-semibold">
                {item.name}
              </span>
            </li>
          ))}
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
          {menuItems.map((item) => (
            <li key={item.name} className="text-gray-800 hover:text-[#D6A74E]">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
