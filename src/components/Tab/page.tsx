// components/MobileBottomNav.tsx
'use client';

import { AiOutlineSearch } from 'react-icons/ai';
import {  IoLocationOutline } from 'react-icons/io5';
import { IoHomeOutline, IoCartOutline } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import Link from 'next/link';

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg md:hidden">
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form action="" className="relative">
            <input
              type="text"
              placeholder="Search your products"
              className="w-full pl-2 py-1 border border-gray-400 rounded-lg shadow-sm focus:outline-none  placeholder-gray-500 text-gray-900"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-2 flex items-center text-gray-600 cursor-pointer z-40"
            >
              <AiOutlineSearch className="w-7 h-7" />
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="flex justify-around items-center pt-1 ">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center  hover:text-yellow-600 transition-colors  duration-200"
        >
          <IoHomeOutline className="text-gray-800" size={20} />
          <span className="text-[11px] text-gray-600 font-semibold">Home</span>
        </Link>

        {/* Whatsapp */}
        <Link
          href="/category"
          className="flex flex-col items-center   hover:text-yellow-600 transition-colors duration-200"
        >
          <BiCategory className="text-gray-800" size={20} />
          <span className="text-gray-600 text-[11px] font-semibold">
            Category
          </span>
        </Link>

        {/* Messenger */}
        <span
          className="flex flex-col items-center  hover:text-yellow-600 transition-colors  duration-200"
          onClick={() => document.getElementById('my_modal_2').showModal()}
        >
          <AiOutlineSearch className="text-gray-800" size={20} />
          <span className="text-gray-600 text-[11px]  font-semibold">
            Search
          </span>
        </span>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative  flex flex-col items-center hover:text-yellow-600 transition-colors duration-200"
        >
          <IoCartOutline className="text-gray-800 " size={20} />
          {/* Badge for cart items */}

          <span className="text-gray-600 text-[11px] font-semibold">Cart</span>
        </Link>

        {/* Facebook */}
        <Link
          href="/wishlist"
          className="flex flex-col items-center  hover:text-yellow-600 transition-colors duration-200 "
        >
          <IoLocationOutline className="text-gray-800" size={20} />
          <span className="text-gray-600 text-[11px] font-semibold">
            Tracking
          </span>
        </Link>
      </div>
    </div>
  );
}
