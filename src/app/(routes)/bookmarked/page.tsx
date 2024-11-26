"use client"; // This is required for client-side rendering

import TheBookmarkedGrid from "./TheBookmarkedGrid";
import useMovieStore from '../../../store/searchStore'; // Importing Zustand store

export default function HomePage() {
  const searchQuery = useMovieStore((state) => state.searchQuery);

  return (
    <div className="px-6 lg:px-0 mb-8 pr-0">
      {searchQuery ? (
        <div className="mt-4">
          <TheBookmarkedGrid />
        </div>
      ) : (
        <>
          <div className="mt-4 Bookmarked Movies">
            <TheBookmarkedGrid />
          </div>
        </>
      )}
    </div>
  );
}

