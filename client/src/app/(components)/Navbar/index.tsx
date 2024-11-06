"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className=" px-6 rounded-full flex items-center justify-between w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-between gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="py-2 pl-10 pr-4 bg-white border-2 border-gray-300 rounded-lg w-50 md:w-60 focus:outline-none focus:border-blue-500"
          />

          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between gap-5">
        <div className="items-center justify-between hidden gap-5 md:flex">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun
                  className="text-gray-500 cursor-pointer hover:text-yellow-500"
                  size={24}
                />
              ) : (
                <Moon
                  className="text-gray-500 cursor-pointer hover:text-blue-500"
                  size={24}
                />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="text-gray-500 cursor-pointer" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 mx-3 border border-l border-gray-300 border-solid h-7" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/profile.jpg"
              alt="Profile"
              width={50}
              height={50}
              className="object-cover h-full rounded-full"
            />
            <span className="font-semibold">Ed Roh</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings
            className="text-gray-500 cursor-pointer hover:text-blue-500"
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
