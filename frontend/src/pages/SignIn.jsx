import React, { useState } from "react";
import logo2 from "../assets/logo2.png";
import logo1 from "../assets/logo1.png";
import { FaEye, FaEyeSlash, FaLess } from "react-icons/fa";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

function signIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { userName, password },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
      <div className="w-[90%] lg:w-[70%] h-[600px] bg-white rounded-2xl flex overflow-hidden border-2 border-[#1a1f23]">
        {/* left side */}
        <div className="w-full lg:w-1/2 h-full bg-white flex flex-col justify-center items-center">
          <div className="flex gap-2 items-center text-[20px] font-semibold mt-[40px] justify-center">
            <span>Sign in to </span>
            <img src={logo2} alt="Vibe logo" className="w-[70px]" />
          </div>

          <div className="relative w-[280px] mt-[40px] mx-auto">
            <label
              htmlFor="username"
              className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-600"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              className="w-full h-[50px] px-4 rounded-2xl border-2 border-black outline-none bg-transparent text-black"
              placeholder="Enter your Username"
              required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </div>

          <div className="relative w-[280px] mt-[40px] mx-auto">
            <label
              htmlFor="password"
              className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-600"
            >
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full h-[50px] px-4 rounded-2xl border-2 border-black outline-none bg-transparent text-black"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {!showPassword ? (
              <FaEye
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>

          <div className="w-[280px] mt-[30px] mx-auto">
            <button
              className="w-full h-[50px] bg-black text-white rounded-2xl cursor-pointer hover:bg-gray-800 transition"
              onClick={handlesignIn}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Sign In"}
            </button>
            <p className="cursor-pointer text-gray-800 px-[15px]">
              Create A New Account ?
              <span
                className="border-b-2 border-b-black pb-[3px] text-black "
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex w-1/2 h-full bg-black rounded-l-[40px] justify-center items-center">
          <img src={logo1} alt="Vibe" className="w-[220px] opacity-90" />
        </div>
      </div>
    </div>
  );
}

export default signIn;
