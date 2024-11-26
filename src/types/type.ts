// src/store/types.ts
export interface Movie {
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
  isTrending: boolean;
  isBookmarked: boolean;
}

export interface MovieStoreState {
  searchQuery: string;
  filteredShows: Movie[];
  filteredMovies: Movie[];
  filteredTvSeries: Movie[];
  setSearchQuery: (query: string) => void;
 toggleBookmark: (title: string) => void;
}
