import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-[9rem] text-white">
      <div className="flex flex-col md:flex-row">
        <div className="p-3 w-full">
          <div className="ml-[2rem] text-2xl font-bold h-12">
            All Movies ({movies?.length})
          </div>

          <div className="flex flex-wrap justify-start items-start p-[2rem]">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="w-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-md m-4 flex flex-col justify-between">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-[300px] h-[200px] object-cover rounded-t"
                  />
                  <div className="px-4 py-3 border-t border-gray-700">
                    <div className="font-semibold text-lg">{movie.name}</div>
                    <p className="text-gray-400 text-sm mt-1">
                      {movie.genre || "Genre"}
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm px-4 mt-2 line-clamp-3">
                    {movie.detail}
                  </p>
                  <div className="mt-auto mb-4">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2 px-4 rounded-md mx-4 mt-4 block text-center"
                    >
                      Update Movie
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
