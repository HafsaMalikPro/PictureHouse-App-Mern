import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f10] text-white">
      <section className="flex flex-wrap items-center justify-center max-w-7xl w-full p-8">
        <div className="w-full md:w-1/2 max-w-md bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="mt-1 p-2 border border-gray-600 rounded w-full bg-[#2a2a2a] text-white focus:ring-2 focus:ring-teal-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="mt-1 p-2 border border-gray-600 rounded w-full bg-[#2a2a2a] text-white focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="mt-1 p-2 border border-gray-600 rounded w-full bg-[#2a2a2a] text-white focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="mt-1 p-2 border border-gray-600 rounded w-full bg-[#2a2a2a] text-white focus:ring-2 focus:ring-teal-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 transition duration-300 py-2 rounded font-semibold"
            >
              {loadingUpdateProfile ? "Updating..." : "Update Profile"}
            </button>

            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
