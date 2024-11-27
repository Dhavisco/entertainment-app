import data from '../../store/data.json'; // Adjust the path to your data.json file
import MovieCard from './MovieCard';

export default function Trending() {
  return (
    <div className="flex  gap-6">
      {data.map((movie) => {
        if (!movie.isTrending) return null; // Skip trending movies as per requirement

        return (
          <MovieCard
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
  );
}
