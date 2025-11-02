// components/MobileBottomNav.tsx
"use client";

import { AiOutlineSearch } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { IoHomeOutline, IoCartOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsOpenCategory,
  setIsOpenSearchModal,
} from "@/redux/features/global/state";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function MobileBottomNav() {
  const dispatch = useAppDispatch();
  const { isOpenSearchModal } = useAppSelector((state) => state.global);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;
    if (searchTerm) {
      router.push(`/search/${searchTerm}`);
      dispatch(setIsOpenSearchModal(false));
    } else {
      router.push(`/`);
    }
  };

  // Open/close the dialog when the global state changes
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    if (isOpenSearchModal) {
      // showModal throws if already open; guard with open check
      try {
        if (!dlg.open) dlg.showModal();
      } catch (e) {
        // ignore
      }
    } else {
      if (dlg.open) dlg.close();
    }
  }, [isOpenSearchModal]);

  // When the dialog is closed by user interaction, sync back to redux
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const handler = () => dispatch(setIsOpenSearchModal(false));
    dlg.addEventListener("close", handler);
    return () => dlg.removeEventListener("close", handler);
  }, [dispatch]);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg md:hidden">
      <dialog ref={dialogRef} id="my_modal_2" className="modal">
        <div className="modal-box">
          <form action="" className="relative" onSubmit={handleSearchSubmit}>
            <input
              name="search"
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
        <span
          className="flex flex-col items-center hover:text-yellow-600 transition-colors duration-200"
          onClick={() => dispatch(setIsOpenCategory(true))}
        >
          <BiCategory className="text-gray-800" size={20} />
          <span className="text-gray-600 text-[11px] font-semibold">
            Category
          </span>
        </span>

        {/* Messenger */}
        <span
          className="flex flex-col items-center  hover:text-yellow-600 transition-colors  duration-200"
          onClick={() => dispatch(setIsOpenSearchModal(true))}
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
