import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false); 
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-[#1a1a1a] border border-gray-700 w-[80%] max-w-lg px-8 py-4 rounded-2xl shadow-lg backdrop-blur-md">
      <section className="flex justify-between items-center gap-8">
        {/* Section 1 */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="flex items-center text-white hover:text-yellow-400 transition-transform duration-300 hover:scale-105"
          >
            <AiOutlineHome size={28} />
            <span className="hidden md:inline-block ml-2 font-semibold">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center text-white hover:text-yellow-400 transition-transform duration-300 hover:scale-105"
          >
            <MdOutlineLocalMovies size={28} />
            <span className="hidden md:inline-block ml-2 font-semibold">Shop</span>
          </Link>
        </div>

        {/* Section 2 */}
        <div className="relative">
          {userInfo ? (
            <div className="flex items-center space-x-2 cursor-pointer text-white" onClick={toggleDropdown}>
              <span className="font-semibold">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          ) : null}

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden text-gray-800 ${
                userInfo.isAdmin ? "-top-28" : "-top-24"
              }`}
            >
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex items-center text-white hover:text-yellow-400 transition-transform duration-300 hover:scale-105"
              >
                <AiOutlineLogin size={28} />
                <span className="hidden md:inline-block ml-2 font-semibold">Login</span>
              </Link>

              <Link
                to="/register"
                className="flex items-center text-white hover:text-yellow-400 transition-transform duration-300 hover:scale-105"
              >
                <AiOutlineUserAdd size={28} />
                <span className="hidden md:inline-block ml-2 font-semibold">Register</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
