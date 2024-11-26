

import { create } from 'zustand';
import { Movie, MovieStoreState } from '../types/type';
import data from './data.json'; // Import movie data

const allShows = data as Movie[];
const movies = allShows.filter((movie) => movie.category === 'Movie');
const tvSeries = allShows.filter((movie) => movie.category === 'TV Series');

const useMovieStore = create<MovieStoreState>((set) => ({
  searchQuery: '',
  filteredShows: allShows,
  filteredMovies: movies,
  filteredTvSeries: tvSeries,
  setSearchQuery: (query: string) => {
    if (query.trim() === '') {
      set({
        searchQuery: '',
        filteredShows: allShows,
        filteredMovies: movies,
        filteredTvSeries: tvSeries,
      });
    } else {
      set({
        searchQuery: query,
        filteredShows: allShows.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        ),
        filteredMovies: movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        ),
        filteredTvSeries: tvSeries.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        ),
      });
    }
  },
  toggleBookmark: (title: string) => {
    set((state) => {
      const updatedShows = state.filteredShows.map((movie) =>
        movie.title === title ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      );

      return {
        ...state,
        filteredShows: updatedShows,
        filteredMovies: updatedShows.filter((movie) => movie.category === 'Movie'),
        filteredTvSeries: updatedShows.filter((movie) => movie.category === 'TV Series'),
      };
    });
  },
}));

export default useMovieStore;
