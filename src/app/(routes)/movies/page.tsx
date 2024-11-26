"use client"; // This is required for client-side rendering

import TheMoviesGrid from "./TheMoviesGrid";
import useMovieStore from '../../../store/searchStore'; // Importing Zustand store

export default function HomePage() {
  const searchQuery = useMovieStore((state) => state.searchQuery);

  return (
    <div className="px-6 lg:px-0 mb-8 pr-0">
      {searchQuery ? (
        <div className="mt-4">
          <TheMoviesGrid />
        </div>
      ) : (
        <>
          <div className="mt-4 Movies">
            <h2 className="lg:text-2xl text-xl text-white font-light">Movies</h2>
            <div className="block justify-center mt-4 pr-6">
              <TheMoviesGrid />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

