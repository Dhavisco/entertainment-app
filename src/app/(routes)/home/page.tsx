"use client"; // This is required for client-side rendering

import MovieGrid from "../../../components/cards/MovieGrid";
import { TrendingCarousel } from "./TrendingCarousel";
import useMovieStore from '../../../store/searchStore'; // Importing Zustand store

export default function HomePage() {
  const searchQuery = useMovieStore((state) => state.searchQuery);

  return (
    <div className="px-6 lg:px-0 mb-8 pr-0">
      {searchQuery ? (
        <div className="mt-4">
          <MovieGrid />
        </div>
      ) : (
        <>
          <div className="trending">
            <h2 className="lg:text-2xl text-xl text-white font-light">Trending</h2>
            <div className="mt-4">
              <TrendingCarousel />
            </div>
          </div>
          <div className="mt-4 recommended">
            <h2 className="lg:text-2xl text-xl text-white font-light">Recommended for you</h2>
            <div className="block justify-center mt-4 pr-6">
              <MovieGrid />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

