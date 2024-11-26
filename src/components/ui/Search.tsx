"use client"; // This is required for client-side rendering

import { Input } from "@/components/ui/input"; // Importing Input from ShadCN UI
import searchIcon from "../../../public/assets/icon-search.svg"; // Importing the search icon
import Image from "next/image"; // Using Next.js Image component
import useMovieStore from "../../store/searchStore";
import { usePathname } from "next/navigation";

export default function Search() {

  const searchQuery = useMovieStore((state)=> state.searchQuery);
  const setSearchQuery = useMovieStore((state)=> state.setSearchQuery);

    const pathname = usePathname(); // Get the current route's pathname

  // Dynamic placeholder based on pathname
  const placeholder = (() => {
    if (pathname === "/movies") return "Search for movies";
    if (pathname === "/tv-series") return "Search for TV series";
    if (pathname === "/bookmarked") return "Search for bookmarked shows";
    return "Search for movies or TV series";
  })();

  return (
    <div className="relative mt-4 lg:mt-8 flex items-center w-full px-4 lg:px-0">
      <Image
        alt="search"
        src={searchIcon}
        className="absolute left-6 lg:left-0 top-1/2 transform -translate-y-1/2"
        width={20}
        height={20}
      />
      <Input
        placeholder={placeholder}
        className="pl-12 lg:pl-8 pr-10 py-2 border-b font-extralight caret-[#fc4747] text-white text-lg md:text-xl w-full lg:w-[90%]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
