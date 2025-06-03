import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
      <nav className="w-full md:w-[12rem] ml-0 md:ml-2 mb-6 md:mb-0">
        <div className="">
          {/* <h2 className="text-white text-xl font-bold mb-4 text-center">Navigation</h2> */}
          <Link
            to="/"
            className="group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 block p-3 rounded-xl mb-2 text-lg text-white/90 hover:text-white hover:shadow-lg hover:transform hover:scale-105 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-2">
              <span>Home</span>
            </div>
          </Link>
          <Link
            to="/movies"
            className="group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 block p-3 rounded-xl mb-2 text-lg text-white/90 hover:text-white hover:shadow-lg hover:transform hover:scale-105 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-2">
              <span>Browse Movies</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="w-full md:w-[85%] mr-0 md:mr-4">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/10">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Movies
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <SliderUtil data={data} />
        </div>
      </div>
    </div>
  );
};

export default Header;