import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../assets/login2.png";
import { loginUser, signupUser } from "../../lib/auth";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    loginUser({ email, password });
    navigate("/chat");
  };

  const handleSignup = () => {
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    signupUser({ email, password });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-10 overflow-y-auto">

      {/* Main Card */}
      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-12">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Welcome ✌️
            </h1>

            <p className="text-lg text-gray-700 max-w-md">
              Fill in the details to get started with the best chat app!
            </p>
          </div>

          {/* Tabs */}
          <div className="w-full max-w-md">

            <div className="flex border-b border-gray-400 mb-8">

              <button
                onClick={() => {
                  setActiveTab("login");
                  setError("");
                }}
                className={`w-1/2 py-3 text-lg font-medium transition-all ${
                  activeTab === "login"
                    ? "border-b-2 border-purple-500 text-black"
                    : "text-gray-500"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                }}
                className={`w-1/2 py-3 text-lg font-medium transition-all ${
                  activeTab === "signup"
                    ? "border-b-2 border-purple-500 text-black"
                    : "text-gray-500"
                }`}
              >
                Signup
              </button>

            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            {/* LOGIN FORM */}
            {activeTab === "login" && (
              <div className="flex flex-col gap-5">

                <div className="text-center mb-2">
                  <h2 className="text-2xl font-semibold text-black mb-3">
                    Login
                  </h2>

                  <p className="text-gray-600">
                    Enter your details to login.
                  </p>
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-5 rounded-full border border-gray-300 outline-none text-gray-700 text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 px-5 rounded-full border border-gray-300 outline-none text-gray-700 text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />

                <button
                  onClick={handleLogin}
                  className="w-full h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium transition-all"
                >
                  Login
                </button>

              </div>
            )}

            {/* SIGNUP FORM */}
            {activeTab === "signup" && (
              <div className="flex flex-col gap-5">

                <div className="text-center mb-2">
                  <h2 className="text-2xl font-semibold text-black mb-3">
                    Signup
                  </h2>

                  <p className="text-gray-600">
                    Enter your details to create an account.
                  </p>
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-5 rounded-full border border-gray-300 outline-none text-gray-700 text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 px-5 rounded-full border border-gray-300 outline-none text-gray-700 text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-14 px-5 rounded-full border border-gray-300 outline-none text-gray-700 text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />

                <button
                  onClick={handleSignup}
                  className="w-full h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium transition-all"
                >
                  Signup
                </button>

              </div>
            )}

          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-10">

          <img
            src={Background}
            alt="Chat illustration"
            className="w-full max-w-[500px] max-h-[600px] object-contain"
          />

        </div>

      </div>
    </div>
  );
};

export default Auth;