"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Icons
import movieIcon from "../../../public/assets/icon-nav-movies.svg"
import tvIcon from "../../../public/assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../../../public/assets/icon-nav-bookmark.svg";
import homeIcon from "../../../public/assets/icon-nav-home.svg";
import logo from "../../../public/assets/logo.svg";
 const userAvatar = "/assets/image-avatar.png"; // Corrected path for user avatar

export default function MobileNav() {
  const pathname = usePathname();
  const links = [
    { href: "/home", label: "Home", icon: homeIcon },
    { href: "/movies", label: "Movies", icon: movieIcon },
    { href: "/tv-series", label: "TV Series", icon: tvIcon },
    { href: "/bookmarked", label: "Bookmarked", icon: bookmarkIcon },
  ];

  return (
    <div className="lg:hidden flex justify-center w-full fixed top-0 z-50">
      <div className="flex justify-between rounded-lg items-center m-2 h-16 px-4 py-4 w-[94%] bg-[#161D2F]">
      <Link href={"/home"} className="flex items-center">
        <Image alt="Logo" src={logo} width={30} height={30} className="object-contain" />
      </Link>
      <div className="flex justify-between gap-4 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href ? 'bg-[#10141E] p-2' : 'hover:bg-[#0d111b77]'
            } hover:text-white`}
          >
            <Image src={link.icon} alt={`${link.label} Icon`} width={18} height={18} />
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

