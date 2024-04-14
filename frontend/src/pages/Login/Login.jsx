// from npm

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/useLogin";

// from file

import loginjpg from "../../assets/login.jpg";

const Login = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setTimeout(() => {
      navigate("/signup");
    }, 1000); // 1000 milliseconds = 1 second
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <img src={loginjpg} alt="" className="h-[100vh] w-full" />
      </div>

      <div
        className="absolute top-[17rem] right-0 left-0 xl:w-1/4 lg:w-1/3 sm:w-1/2 w-[80%]  h-[43vh] p-6 rounded-lg shadow-md
       bg-second bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80 mx-auto "
      >
        <h1 className="text-white text-center text-4xl font-semibold mb-8">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full max-w-md items-center gap-1.5 mb-4 ">
            <Label htmlFor="email" className="text-white text-lg">
              Email
            </Label>
            <input
              type="email"
              id="email"
              className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 mb-4">
            <Label htmlFor="password" className="text-white text-lg">
              Password
            </Label>
            <input
              type="password"
              id="password"
              className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            onClick={handleSignupClick}
            to="#"
            className="text-white text-lg hover:underline mt-4 block"
          >
            Don't have an account?
          </Link>
          <div className="flex justify-center items-center mt-8">
            <button className="bg-gray-900 text-white text-xl rounded-lg px-8 py-4">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
