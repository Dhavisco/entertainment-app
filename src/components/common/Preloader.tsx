"use client";

import Image from "next/image";
import logo from "../../../public/assets/logo.svg";

export default function Preloader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#10141E]">
      {/* Logo */}
      <Image src={logo} alt="Loading Logo" className="animate-bounce" />
      {/* Loading Text */}
      <p className="text-gray-400 mt-4 animate-pulse">Loading, please wait...</p>
    </div>
  );
}
