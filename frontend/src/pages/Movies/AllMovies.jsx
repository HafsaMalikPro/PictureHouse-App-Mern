
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  return (
    <div className="min-h-screen">
      <section>
        {/* Hero Banner Section */}
        <div
          className="relative h-[60rem] w-full mb-0 flex items-center justify-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${banner})` }}
        >
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30"></div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white mt-[8rem] px-4">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                The Movies Hub
              </h1>
              <div className="w-32 h-1  mx-auto mb-6 rounded-full"></div>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
                Cinematic Odyssey: Unveiling the Magic of Movies
              </p>
            </div>
          </div>

          {/* Search & Filter Section */}
          <div className="absolute bottom-[-8rem] left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 z-20">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-16 bg-white/10 backdrop-blur-md border border-white/20 px-16 outline-none rounded-2xl text-white text-lg placeholder-white/60 shadow-2xl focus:bg-white/15 focus:border-purple-400 transition-all duration-300"
                  placeholder="Search your favorite movies..."
                  value={moviesFilter.searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10 mb-10">
              {/* Genre Filter */}
              <div className="relative">
                <select
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-4 pr-12 rounded-xl text-white text-sm font-medium shadow-lg focus:bg-white/15 focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer min-w-[160px]"
                  value={moviesFilter.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="" className="bg-slate-800 text-white">🎭 All Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id} className="bg-slate-800 text-white">
                      {genre.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Year Filter */}
              <div className="relative">
                <select
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-4 pr-12 rounded-xl text-white text-sm font-medium shadow-lg focus:bg-white/15 focus:border-green-400 transition-all duration-300 appearance-none cursor-pointer min-w-[140px]"
                  value={moviesFilter.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="" className="bg-slate-800 text-white">📅 All Years</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year} className="bg-slate-800 text-white">
                      {year}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-4 pr-12 rounded-xl text-white text-sm font-medium shadow-lg focus:bg-white/15 focus:border-yellow-400 transition-all duration-300 appearance-none cursor-pointer min-w-[160px]"
                  value={moviesFilter.selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="" className="bg-slate-800 text-white">🔥 Sort By</option>
                  <option value="new" className="bg-slate-800 text-white">✨ New Movies</option>
                  <option value="top" className="bg-slate-800 text-white">⭐ Top Movies</option>
                  <option value="random" className="bg-slate-800 text-white">🎲 Random Movies</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Grid Section */}
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="mb-12 mt-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4  bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {filteredMovies?.length > 0 ? 
                  `Discover ${filteredMovies.length} Amazing Movies` : 
                  'Loading Your Cinematic Journey...'
                }
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMovies?.map((movie) => (
                <div key={movie._id} className="transform hover:scale-105 transition-transform duration-300">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredMovies?.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto border border-white/10">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1l-.117 15.993A2 2 0 0 1 18.883 22H5.117a2 2 0 0 1-1.995-1.85L3 6H2a1 1 0 0 1 0-2h4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">No Movies Found</h3>
                  <p className="text-white/70">Try adjusting your search or filters to discover more movies!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllMovies;