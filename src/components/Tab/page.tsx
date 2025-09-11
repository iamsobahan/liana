// components/MobileBottomNav.tsx
'use client';

import { FaFacebookF } from 'react-icons/fa';

import { IoHomeOutline, IoCartOutline } from 'react-icons/io5';
import { RiMessengerLine } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-around items-center pt-1 ">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center  hover:text-yellow-600 transition-colors  duration-200"
        >
          <IoHomeOutline className="text-gray-800" size={20} />
          <span className="text-[11px] text-gray-600 font-semibold">
            Home
          </span>
        </Link>

        {/* Whatsapp */}
        <Link
          href="/category"
          className="flex flex-col items-center   hover:text-yellow-600 transition-colors duration-200"
        >
          <FaWhatsapp className="text-gray-800" size={20} />
          <span className="text-gray-600 text-[11px] font-semibold">
            Whatsapp
          </span>
        </Link>

        {/* Messenger */}
        <Link
          href="/search"
          className="flex flex-col items-center  hover:text-yellow-600 transition-colors  duration-200"
        >
          <RiMessengerLine className="text-gray-800" size={20} />
          <span className="text-gray-600 text-[11px]  font-semibold">
            Messenger
          </span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative  flex flex-col items-center hover:text-yellow-600 transition-colors duration-200"
        >
          <IoCartOutline className="text-gray-800 " size={20} />
          {/* Badge for cart items */}

          <span className="text-gray-600 text-[11px] font-semibold">
            Cart
          </span>
        </Link>

        {/* Facebook */}
        <Link
          href="/wishlist"
          className="flex flex-col items-center  hover:text-yellow-600 transition-colors duration-200 "
        >
          <FaFacebookF className="text-gray-800" size={20} />
          <span className="text-gray-600 text-[11px] font-semibold">
            Facebook
          </span>
        </Link>
      </div>
    </div>
  );
}
