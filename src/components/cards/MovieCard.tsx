import Image from "next/image";
// import { useState } from "react";
import useMovieStore from "../../store/searchStore";
import movieIcon from "../../../public/assets/icon-movies.svg";
import tvIcon from "../../../public/assets/icon-tv-series.svg";

import playIcon from "../../../public/assets/icon-play.svg";

interface MovieCardProps {
  title: string;
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
    trending?: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isTrending?: boolean;
  isBookmarked: boolean; // Add isBookmarked to the prop
}

export default function MovieCard({
  title,
  thumbnail,
  year,
  category,
  rating,
  isTrending = true,
  isBookmarked,
}: MovieCardProps) {

  const toggleBookmark = useMovieStore((state) => state.toggleBookmark);

  if (!thumbnail) {
    return null; // Avoid rendering the card if no thumbnail is provided
  }

  // Icon based on category
  const categoryIcon =
    category === "TV Series" ? (
      <Image src={tvIcon} alt="TV Icon" className="h-2 w-2 sm:h-4 sm:w-4" />
    ) : (
      <Image src={movieIcon} alt="Movie Icon" className="h-2 w-2 sm:h-4 sm:w-4" />
    );

  return (
    <div className={`relative group w-full ${isTrending ? 'h-auto md:h-[220px]' : 'h-auto md:h-[100px]'} rounded-lg overflow-hidden`}>
      {/* Thumbnail Image */}
      {/* Small Device Image */}
      <div className="block sm:hidden">
        <Image
          src={thumbnail.regular.small}
          alt={title}
          width={500}
          height={300}
          objectFit="cover"
          className="transition-transform rounded-lg duration-300"
        />
      </div>

      {/* Medium Device Image */}
      <div className="hidden sm:block md:hidden">
        <Image
          src={thumbnail.regular.medium}
          alt={title}
          layout="fill" objectFit="cover"
          className="transition-transform rounded-lg duration-300"
        />
      </div>

      {/* Large Device Image */}
      <div className="hidden md:block">
        <Image
          src={thumbnail.regular.large}
          alt={title}
          layout="fill" objectFit="cover"
          className="transition-transform rounded-lg duration-300"
        />
      </div>

      {/* Overlay for Movie Details */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="text-white">
          {/* Year */}
          <p className="text-xs sm:text-base font-light flex items-center gap-2 opacity-75">
            <span>{year}</span>
            <span className="w-1 h-1 rounded-full bg-white" /> {/* Dot Separator */}
            {/* Category with Icon */}
            <span className="category text-xs sm:text-base flex items-center gap-1">
              <span>{categoryIcon}</span>
              <span>{category}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="text-xs sm:text-base">{rating}</span>
          </p>

          {/* Title */}
          <h3 className="mt-1 text-base sm:text-xl font-normal">{title}</h3>
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="bg-white flex justify-start items-center gap-3 bg-opacity-25 py-2 pl-2 pr-8 rounded-3xl cursor-pointer">
          <Image src={playIcon} alt="Play Icon" className="h-8 w-8" />
          <div className="text-white text-lg">Play</div>
        </div>
      </div>

      {/* Bookmark Icon */}
     <button
          className={`absolute top-4 right-4 p-1 px-2.5 py-2 rounded-full z-30 transition-colors duration-300 ${
            isBookmarked
              ? 'bg-[#00000054] text-white'
              : 'bg-[#00000054] hover:bg-white bg-opacity-50 hover:text-black'
          }`}
          onClick={() => toggleBookmark(title)}
        >
    {isBookmarked ? ( 
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"> 
        <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" fill="#FFF"/> </svg> 
        ) : ( 
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" 
        className="stroke-white hover:stroke-black"> 
        <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" strokeWidth="1.5" fill="none"/> 
        </svg> )} 
        </button>
    </div>
  );
}


