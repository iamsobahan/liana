import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import Image from "next/image";

import logo_white from "../../assets/footer_logo.png";
import payment from "../../assets/payment.png";

const FooterPage = () => {
  return (
    <footer className="bg-gray-800 text-white font-rajdhani pt-16 pb-8 px-4 md:px-10 lg:px-20 mt-10">
      <div className="grid grid-cols-1 md:gap-10 border-b border-gray-800 pb-5 md:grid-cols-5">
        {/* Logo and Social */}
        <div className="space-y-5 md:col-span-1">
          <div className="flex items-center space-x-2">
            <Image
              className="w-auto h-auto"
              src={logo_white}
              alt="Joice Jewelry"
              width={160}
              height={80}
            />
          </div>
          <p className="text-sm text-gray-400">
            Eram Import House – 100% Authentic Imported Products for Retail &
            Wholesale.
          </p>
          <div className="flex items-center gap-3">
            <button className="bg-gray-800 p-2 rounded hover:bg-yellow-500 transition">
              <FaFacebookF />
            </button>
            <button className="bg-gray-800 p-2 rounded hover:bg-yellow-500 transition">
              <FaInstagram />
            </button>
            <button className="bg-gray-800 p-2 rounded hover:bg-yellow-500 transition">
              <FaXTwitter />
            </button>
            <button className="bg-gray-800 p-2 rounded hover:bg-yellow-500 transition">
              <FaYoutube />
            </button>
          </div>
          <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Subscription Form */}
            <form className="flex w-full md:w-2/3 items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 bg-transparent border border-gray-700 rounded placeholder:text-gray-400 text-white focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex relative w-full md:w-[1200px] h-[60px] justify-center">
            <Image
              src={payment}
              alt="payment_method"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Remaining 4 sections: nested grid on mobile */}
        <div className="grid grid-cols-2 gap-2 md:contents">
          {/* Account */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ACCOUNT</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Dashboard</li>
              <li>Orders</li>
              <li>Wishlist</li>
              <li>Addresses</li>
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-lg font-semibold mb-4">CATALOG</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Shop by category</li>
              <li>Shop by brand</li>
              <li>Promotions</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Features</li>
              <li>FAQ</li>
              <li>About us</li>
              <li>Contact us</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">CONTACT US</h4>
            <a
              href="https://www.google.com/maps?sca_esv=f44b811aa6ac63b8&output=search&q=shah+ali+plaza&source=lnms&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeuyr9ljWioGWIw0oasFed3pekTy9ejcwggIWHfXrlrOSGrh2X_EMuX3vWLEhC3RsgkgsDkY9Gc9kiPOjhkvrQhaslGB9cu-ZsZbOyCRVBvA2U_5aXyFK8-FHdNDGRDJHU96eMLVCclPLciixgmfZp2PdBX2Vl42-FHVxpcxvc12PbVgBEw&entry=mc&ved=1t:200715&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-gray-400 text-sm hover:text-yellow-500 transition"
            >
              <HiOutlineMapPin className="mt-1 text-yellow-500" />
              <p>
                Mirpur 10, Sha Ali, 14 No floor
                <br />
                Dhaka, Bangladesh
              </p>
            </a>
            <a
              href="tel:+1666855558464"
              className="flex items-start gap-2 mt-4 text-gray-400 text-sm hover:text-yellow-500 transition"
            >
              <HiOutlinePhone className="mt-1 text-yellow-500" />
              <p>
                Call us 9 AM - 10 PM
                <br />
                +8801974117106
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 text-xs text-gray-500">
        <p>Copyright © 2025 Eram. All Rights Reserved</p>
        <div className="flex items-center gap-4">
          <p>Terms of use</p>
          <p>Privacy Policy</p>
          <p>Interest Based Ads</p>
          <p>Accessibility</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
