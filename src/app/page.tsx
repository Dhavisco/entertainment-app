"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.svg"; // Import the logo
import Preloader from "../components/common/Preloader"; // Import Preloader component
import Link from "next/link";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false); // Hide preloader
      // Add a delay for fade-in
      setTimeout(() => {
        setFadeIn(true); // Trigger fade-in effect
      }, 100); // Delay of 500ms after preloader disappears
    }, 2000); // 2 seconds

    return () => clearTimeout(preloaderTimer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div
      className={`bg-[#10141E] h-screen flex flex-col transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >

  
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Image
          src={logo}
          alt="Logo"
          className="w-24 h-16 sm:w-32 sm:h-24"
        />

        {/* Welcome Text */}
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mt-6 text-center">
          Welcome to MovieZone
        </h1>
        <p className="text-gray-400 mt-2 text-center max-w-lg leading-relaxed text-sm sm:text-base lg:text-lg mx-4">
          Discover a vast collection of movies and TV shows tailored to your
          preferences. Sign up or log in to start curating your favorites!
        </p>

        {/* Action Buttons */}
        <div className="mt-8 space-x-0 sm:space-x-4 flex flex-wrap gap-2 justify-center">
          <Link href = "/login">
          <button
            aria-label="Log in to MovieZone"
            className="px-6 py-3 bg-white hover:shadow-xl hover:bg-gray-100 text-black rounded-md font-medium transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            Log In
          </button>
          </Link>
          <Link href="/signup">
          <button
            aria-label="Sign up for MovieZone"
            className="px-6 py-3 bg-[#FC4747] hover:bg-[#e43838] text-white rounded-md font-medium transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            Sign Up
          </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-gray-500 text-xs sm:text-sm py-4 text-center">
        <p>&copy; {new Date().getFullYear()} MovieZone. All rights reserved.</p>
      </footer>
    </div>
  );
}
