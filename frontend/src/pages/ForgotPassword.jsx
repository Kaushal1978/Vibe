import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [step, setStep] = useState(3);
  const [email, setEmail] = useState("");
  const [otp,setOtp] = useState("")
  const [loading, setLoading] = useState(false);
  const [newPassword,setNewPassword] = useState("")
  const [confirmNewPassword,setConfirmNewPassword] = useState("")

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
      {/* step 1 */}
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] ">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>

          {/* email input */}
          <div className="relative w-[280px] mt-[40px] mx-auto">
            <label
              htmlFor="email"
              className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-600"
            >
              Email
            </label>

            <input
              type="text"
              id="email"
              className="w-full h-[50px] px-4 rounded-2xl border-2 border-black outline-none bg-transparent text-black"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* button */}
          <div className="w-[280px] mt-[30px] mx-auto">
            <button
              className="w-full h-[50px] bg-black text-white rounded-2xl cursor-pointer hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
          </div>
        </div>
      )}

      {/* step 2 */}
        {step == 2 && <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] ">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>

          {/* otp input */}
          <div className="relative w-[280px] mt-[40px] mx-auto">
            <label
              htmlFor="otp"
              className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-600"
            >
              OTP
            </label>

            <input
              type="text"
              id="otp"
              className="w-full h-[50px] px-4 rounded-2xl border-2 border-black outline-none bg-transparent text-black"
              placeholder="Enter OTP"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>

          {/* button */}
          <div className="w-[280px] mt-[30px] mx-auto">
            <button
              className="w-full h-[50px] bg-black text-white rounded-2xl cursor-pointer hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
          </div>
        </div>}

      {/* step 3 */}
      {step == 3 && <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] ">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>

          {/* new password input */}
          <div className="relative w-[280px] mt-[40px] mx-auto">
            <label
              htmlFor="newPassword"
              className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-600"
            >
              New Password
            </label>

            <input
              type="password"
              id="newPassword"
              className="w-full h-[50px] px-4 rounded-2xl border-2 border-black outline-none bg-transparent text-black"
              placeholder="Enter New Password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

           {/* confirm new password input */}
          <div className="relative w-[280px] mt-[40px] mx-auto">
            <label
              htmlFor="confirmNewPassword"
              className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-600"
            >
              Confirm New Password
            </label>

            <input
              type="password"
              id="confirmNewPassword"
              className="w-full h-[50px] px-4 rounded-2xl border-2 border-black outline-none bg-transparent text-black"
              placeholder="Confirm New Password"
              required
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
            />
          </div>

          {/* button */}
          <div className="w-[280px] mt-[30px] mx-auto">
            <button
              className="w-full h-[50px] bg-black text-white rounded-2xl cursor-pointer hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
            </button>
          </div>
        </div>}      
        
      
    </div>
  );
}

export default ForgotPassword;
