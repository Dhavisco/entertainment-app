"use client"; // This is required for client-side rendering

import TheSeriesGrid from "./TheSeriesGrid";
import useMovieStore from '../../../store/searchStore'; // Importing Zustand store

export default function HomePage() {
  const searchQuery = useMovieStore((state) => state.searchQuery);

  return (
    <div className="px-6 lg:px-0 mb-8 pr-0">
      {searchQuery ? (
        <div className="mt-4">
          <TheSeriesGrid />
        </div>
      ) : (
        <>
          <div className="mt-4 Series">
            <h2 className="lg:text-2xl text-xl text-white font-light">TV Series</h2>
            <div className="block justify-center mt-4 pr-6">
              <TheSeriesGrid />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

