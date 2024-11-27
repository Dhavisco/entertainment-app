
"use client"; // This is required for client-side rendering

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import movieIcon from "../../../public/assets/icon-nav-movies.svg"
import tvIcon from "../../../public/assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../../../public/assets/icon-nav-bookmark.svg";
import homeIcon from "../../../public/assets/icon-nav-home.svg";
import activeBookmarkIcon from "../../../public/assets/icon-bookmark-full.svg"
import activeHomeIcon from "../../../public/assets/icon-nav-home-full.svg"
import activeMoviesIcon from "../../../public/assets/icon-movies.svg"
import activeTVIcon from "../../../public/assets/icon-tv-series.svg"
import logo from "../../../public/assets/logo.svg";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const pathname = usePathname(); // Get the current path
  const userAvatar = "/assets/image-avatar.png"; // Corrected path for user avatar

  const links = [
    { href: "/home", label: "Home", icon:  pathname === "/home" ? activeHomeIcon : homeIcon },
    { href: "/movies", label: "Movies", icon:  pathname === "/movies" ? activeMoviesIcon : movieIcon },
    { href: "/tv-series", label: "TV Series", icon:  pathname === "/tv-series" ? activeTVIcon : tvIcon },
    {href: "/bookmarked",label: "Bookmarked", icon: pathname === "/bookmarked" ? activeBookmarkIcon : bookmarkIcon},
  ];

  return (
    <div className="hidden lg:flex fixed z-50 h-screen">
      <div
        className={`flex flex-col h-[94%] bg-[#161D2F] text-white ${
          isCollapsed ? "w-20" : "w-44"
        } transition-all duration-300 ease-in-out rounded-xl m-6`}
      >
        {/* Logo at the top */}
        <Link href={"/home"} className="flex items-center cursor-pointer justify-center mt-2 p-4">
          <Image alt="Logo" src={logo} width={30} height={30} />
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3 mt-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              } hover:bg-[#0d111b77] px-4 mx-2 py-3`}
            >
              <div className={`${isCollapsed ? "" : "mr-4"}`}>
                <Image src={link.icon} alt="Nav Icon" />
              </div>
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-auto">
          {/* Toggle Button */}
          <div className={`flex items-center justify-center p-2`}>
            <span
              className={`text-white text-2xl cursor-pointer transform transition-transform duration-300`}
              onClick={() => onToggleCollapse(!isCollapsed)}
            >
              {isCollapsed ? (
                <GoSidebarCollapse className="text-[#c8cfdf] w-7 h-7" />
              ) : (
                <GoSidebarExpand className="text-[#c8cfdf] w-7 h-7" />
              )}
            </span>
          </div>

          {/* Avatar at the Footer */}
          <div className={`flex items-center mt-4 cursor-pointer justify-center p-4`}>
            <Image
              src={userAvatar}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



