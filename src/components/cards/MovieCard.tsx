import Image from "next/image";
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
  isBookmarked: boolean;
}

export default function MovieCard({
  title,
  thumbnail,
  year,
  category,
  rating,
  isTrending = false,
  isBookmarked,
}: MovieCardProps) {
  const toggleBookmark = useMovieStore((state) => state.toggleBookmark);

  if (!thumbnail) {
    return null;
  }

  const categoryIcon =
    category === "TV Series" ? (
      <Image 
        src={tvIcon} 
        alt="TV Icon" 
        width={16} 
        height={16} 
        className="h-2 w-2 sm:h-4 sm:w-4" 
      />
    ) : (
      <Image 
        src={movieIcon} 
        alt="Movie Icon" 
        width={16} 
        height={16} 
        className="h-2 w-2 sm:h-4 sm:w-4" 
      />
    );

  return (
    <div className={`relative group w-full ${isTrending ? 'h-[230px] sm:h-[250px]' : 'h-[170px] sm:h-[210px]'} rounded-lg overflow-hidden`}>
      {/* Fallback/Small Device Image (Always Visible) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={thumbnail.regular.small}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={isTrending}
        />
      </div>

      {/* Medium Device Image (Optional Enhancement) */}
      <div className="hidden sm:block md:hidden absolute inset-0 w-full h-full">
        <Image
          src={thumbnail.regular.medium}
          alt={title}
          fill
          sizes="(min-width: 640px) and (max-width: 768px) 100vw"
          className="object-cover"
          priority={isTrending}
        />
      </div>

      {/* Large Device Image */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <Image
          src={thumbnail.regular.large}
          alt={title}
          fill
          sizes="(min-width: 768px) 100vw"
          className="object-cover"
          priority={isTrending}
        />
      </div>

      {/* Overlay for Movie Details */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-20 bg-gradient-to-t from-black/70 to-transparent">
        <div className="text-white">
          {/* Movie Metadata */}
          <div className="text-xs sm:text-base font-light flex items-center gap-2 opacity-75">
            <span>{year}</span>
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="category text-xs sm:text-base flex items-center gap-1">
              {categoryIcon}
              <span>{category}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="text-xs sm:text-base">{rating}</span>
          </div>

          {/* Title */}
          <h3 className="mt-1 text-base sm:text-xl font-normal">{title}</h3>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <div className="bg-white flex justify-start items-center gap-3 bg-opacity-25 py-2 pl-2 pr-8 rounded-3xl cursor-pointer">
          <Image 
            src={playIcon} 
            alt="Play Icon" 
            width={32} 
            height={32} 
          />
          <div className="text-white text-lg">Play</div>
        </div>
      </div>

      {/* Bookmark Button */}
      <button
        className={`absolute top-4 right-4 p-1 px-2.5 py-2 rounded-full z-40 transition-colors duration-300 ${
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
  );
}