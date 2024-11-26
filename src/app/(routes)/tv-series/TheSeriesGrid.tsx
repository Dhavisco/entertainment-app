"use client"; // This is required for client-side rendering

import useMovieStore from '../../../store/searchStore'; // Importing Zustand store
import RMovieCard from '../../../components/cards/RMovieCard';

export default function TheSeriesGrid() {
  const filteredTvSeries = useMovieStore((state) => state.filteredTvSeries);
  const searchQuery = useMovieStore((state) => state.searchQuery);

  return (
    <div>
      {searchQuery ? (
        <div className='search-results'>
          <h2 className="lg:text-2xl text-xl text-white font-light mb-4">
          {`Found ${filteredTvSeries.length} results for "${searchQuery}"`}
        </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:w-[97%] lg:grid-cols-4 md:gap:6 gap-4 lg:mr-0 mr-5">
        {filteredTvSeries.map((movie) => {
          return (
            <RMovieCard
              key={movie.title}
              title={movie.title}
              thumbnail={{ regular: movie.thumbnail.regular }} // Wrap the regular object in another object
              year={movie.year}
              category={movie.category}
              rating={movie.rating}
              isBookmarked={movie.isBookmarked}
              isTrending={movie.isTrending}
            />
          );
        })}
      </div>
        </div>
      ): (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:w-full lg:grid-cols-4 gap-6">
        {filteredTvSeries.map((movie) => {

          return (
            <RMovieCard
              key={movie.title}
              title={movie.title}
              thumbnail={{ regular: movie.thumbnail.regular }} // Wrap the regular object in another object
              year={movie.year}
              category={movie.category}
              rating={movie.rating}
              isBookmarked={movie.isBookmarked}
              isTrending={movie.isTrending}
            />
          );
        })}
      </div>
      )
      
      }
      
    </div>
  );
}