"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Icons
import movieIcon from "../../../public/assets/icon-nav-movies.svg"
import tvIcon from "../../../public/assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../../../public/assets/icon-nav-bookmark.svg";
import homeIcon from "../../../public/assets/icon-nav-home.svg";
import activeBookmarkIcon from "../../../public/assets/icon-bookmark-full.svg"
import activeHomeIcon from "../../../public/assets/icon-nav-home-full.svg"
import activeMoviesIcon from "../../../public/assets/icon-movies.svg"
import activeTVIcon from "../../../public/assets/icon-tv-series.svg"
import logo from "../../../public/assets/logo.svg";
 const userAvatar = "/assets/image-avatar.png"; // Corrected path for user avatar

export default function MobileNav() {
  const pathname = usePathname();
  const links = [
    { href: "/home", label: "Home", icon:  pathname === "/home" ? activeHomeIcon : homeIcon },
    { href: "/movies", label: "Movies", icon:  pathname === "/movies" ? activeMoviesIcon : movieIcon },
    { href: "/tv-series", label: "TV Series", icon:  pathname === "/tv-series" ? activeTVIcon : tvIcon },
    {href: "/bookmarked",label: "Bookmarked", icon: pathname === "/bookmarked" ? activeBookmarkIcon : bookmarkIcon},
  ];

  return (
    <div className="lg:hidden flex justify-center w-full fixed top-0 z-50">
      <div className="flex justify-between rounded-lg items-center m-2 h-16 px-4 py-4 w-[94%] bg-[#161D2F]">
      <Link href={"/home"} className="flex items-center">
        <Image alt="Logo" src={logo} className="object-contain" />
      </Link>
      <div className="flex justify-between gap-4 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={'hover:bg-[#0d111b77]'}
          >
            <Image src={link.icon} alt={`${link.label} Icon`} />
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Image src={userAvatar} alt="User Avatar" width={35} height={35} className="rounded-full" />
      </div>
      </div>
      
    </div>
  );
}

