import Image from "next/image";
import movieIcon from "../../../public/assets/icon-category-movie.svg"
import tvIcon from "../../../public/assets/icon-tv-series.svg";
import playIcon from "../../../public/assets/icon-play.svg";
import useMovieStore from "../../store/searchStore";

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
  isBookmarked: boolean;
}

export default function MovieCard({
  title,
  thumbnail,
  year,
  category,
  rating,
  isTrending,
  isBookmarked,
}: MovieCardProps) {
  const toggleBookmark = useMovieStore((state) => state.toggleBookmark);

  if (!thumbnail) {
    return null;
  }

  const categoryIcon =
    category === "TV Series" ? (
      <Image src={tvIcon} alt="TV Icon" width={16} height={16} className="h-2 w-2 sm:h-4 sm:w-4" />
    ) : (
      <Image src={movieIcon} alt="Movie Icon" width={16} height={16} className="h-2 w-2 sm:h-4 sm:w-4" />
    );

  return (
    <div className="w-full rounded-lg overflow-hidden">
      {/* Thumbnail Image Container */}
      <div
        className={`relative group w-full ${
          isTrending ? 'h-[160px] md:h-[180px] sm:h-[200px]' : 'h-[160px] md:h-[180px] sm:h-[200px]'
        }`}
      >
        {/* Small Device Image */}
        <div className="block sm:hidden absolute inset-0 w-full h-full">
          <Image 
            src={thumbnail.regular.small} 
            alt={title} 
            fill
            sizes="(max-width: 640px) 100vw"
            className="object-cover transition-transform rounded-lg duration-300" 
          />
        </div>

        {/* Medium Device Image */}
        <div className="hidden sm:block md:hidden absolute inset-0 w-full h-full">
          <Image 
            src={thumbnail.regular.medium} 
            alt={title} 
            fill
            sizes="(min-width: 640px) and (max-width: 768px) 100vw"
            className="object-cover transition-transform rounded-lg duration-300" 
          />
        </div>
        
        {/* Large Device Image */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image
            src={thumbnail.regular.large}
            alt={title}
            fill
            sizes="(min-width: 768px) 100vw"
            className="object-cover transition-transform rounded-lg duration-300"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10 pointer-events-none"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="bg-white flex justify-start items-center cursor-pointer gap-3 bg-opacity-25 py-2 pl-2 pr-8 rounded-3xl">
            <Image src={playIcon} alt="Play Icon" width={32} height={32} className="h-8 w-8" />
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
              <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" fill="#FFF"/> 
            </svg> 
          ) : ( 
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" 
              className="stroke-white hover:stroke-black"> 
              <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" strokeWidth="1.5" fill="none"/> 
            </svg>
          )} 
        </button>
      </div>

      {/* Movie Details Section */}
      <div className="text-white mt-2">
        <div className="flex items-center gap-1">
          {/* Year */}
          <span className="text-xs sm:text-base font-extralight">{year}</span>

          {/* Dot Separator */}
          <span className="w-1 h-1 rounded-full bg-[#979797] mx-1 md:mx-2"></span>

          {/* Category with Icon */}
          <div className="text-xs sm:text-base flex items-center gap-2">
            {categoryIcon}
            <span className="font-extralight">{category}</span>
          </div>

          {/* Dot Separator */}
          <span className="w-1 h-1 rounded-full bg-[#979797] mx-1 md:mx-2"></span>

          {/* Rating */}
          <span className="text-xs sm:text-base font-extralight">{rating}</span>
        </div>

        {/* Title */}
        <h3 className="mt-1 text-base sm:text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
}