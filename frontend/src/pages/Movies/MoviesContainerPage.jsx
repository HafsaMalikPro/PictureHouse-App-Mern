import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-8">
      <nav className="ml-[2rem] lg:ml-[4rem] w-full lg:w-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 sticky top-4">
          <h2 className="text-white text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Genres
          </h2>
          <div className="flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row flex-wrap gap-2">
            <button
              className={`transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 hover:shadow-lg hover:transform hover:scale-105 block p-3 rounded-xl text-sm font-medium ${
                selectedGenre === null 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                  : "bg-white/10 text-white/80 hover:text-white"
              }`}
              onClick={() => handleGenreClick(null)}
            >
              All Genres
            </button>
            {genres?.map((g) => (
              <button
                key={g._id}
                className={`transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:transform hover:scale-105 block p-3 rounded-xl text-sm font-medium ${
                  selectedGenre === g._id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white/10 text-white/80 hover:text-white"
                }`}
                onClick={() => handleGenreClick(g._id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="flex flex-col justify-center items-center w-full lg:w-auto flex-1">
        <div className="w-full lg:w-[100rem] mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/10">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Choose For You
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </div>
            <SliderUtil data={randomMovies} />
          </div>
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/10">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                Top Movies
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"></div>
            </div>
            <SliderUtil data={topMovies} />
          </div>
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/10">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {selectedGenre ? `${genres?.find(g => g._id === selectedGenre)?.name} Movies` : 'Choose Movie'}
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <SliderUtil data={filteredMovies} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;