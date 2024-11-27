'use client';

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MovieCard from "./MovieCard";
import useMovieStore from "../../store/searchStore";

export function TrendingCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Filter only trending movies
  const filteredShows = useMovieStore((state) => state.filteredShows);
  const trendingMovies = filteredShows.filter((movie) => movie.isTrending);

  // Handle mouse enter and leave for autoplay
  const handleMouseEnter = () => plugin.current.stop();
  const handleMouseLeave = () => plugin.current.play();

  return (
    <div className="relative w-full mx-auto">
      <Carousel
        plugins={[plugin.current]}
        className="w-full overflow-hidden"
        opts={{
          align: "start",
          containScroll: "keepSnaps"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselContent className="flex gap-4">
          {trendingMovies.map((movie) => (
            <CarouselItem
              key={movie.title}
              className="flex-shrink-0 basis-[70%] sm:basis-[70%] md:basis-[70%] lg:basis-[40%]"
            >
              <MovieCard
                title={movie.title}
                thumbnail={{ regular: movie.thumbnail.regular }}
                year={movie.year}
                category={movie.category}
                rating={movie.rating}
                isBookmarked={movie.isBookmarked}
                isTrending={movie.isTrending}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10" />
      </Carousel>
    </div>
  );
}
