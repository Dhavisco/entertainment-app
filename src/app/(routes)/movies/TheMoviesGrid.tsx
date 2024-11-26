"use client";

import useMovieStore from '../../../store/searchStore';
import RMovieCard from '../../../components/cards/RMovieCard';

export default function TheMoviesGrid() {
  const filteredMovies = useMovieStore((state) => state.filteredMovies);
  const searchQuery = useMovieStore((state) => state.searchQuery);

  return (
    <div>
      {searchQuery ? (
        <div className="search-results">
          <h2 className="lg:text-2xl text-xl text-white font-light mb-4">
            {`Found ${filteredMovies.length} results for "${searchQuery}"`}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:w-[97%] lg:grid-cols-4 md:gap:6 gap-4 lg:mr-0 mr-5">
            {filteredMovies.map((movie) => (
              <RMovieCard
                key={movie.title}
                title={movie.title}
                thumbnail={{ regular: movie.thumbnail.regular }}
                year={movie.year}
                category={movie.category}
                rating={movie.rating}
                isBookmarked={movie.isBookmarked}
                isTrending={movie.isTrending}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:w-full lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <RMovieCard
              key={movie.title}
              title={movie.title}
              thumbnail={{ regular: movie.thumbnail.regular }}
              year={movie.year}
              category={movie.category}
              rating={movie.rating}
              isBookmarked={movie.isBookmarked}
              isTrending={movie.isTrending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
