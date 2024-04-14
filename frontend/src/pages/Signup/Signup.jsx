// from npm

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

// from file
import useSignup from "@/hooks/useSignup";

import loginjpg from "../../assets/login.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000); // 1000 milliseconds = 1 second
  };

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <img src={loginjpg} alt="" className="h-[100vh] w-full" />
      </div>

      <div
        className="absolute top-[15rem] right-0 left-0 xl:w-1/4 lg:w-1/3 sm:w-1/2 w-[80%] h-[62vh] p-6 rounded-lg shadow-md
       bg-second bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80 mx-auto "
      >
        <h1 className="text-white text-center text-4xl font-semibold mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full max-w-md items-center gap-1.5 mb-4 ">
            <Label htmlFor="username" className="text-white text-md">
              Username
            </Label>
            <input
              type="text"
              id="username"
              className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 mb-4 ">
            <Label htmlFor="email" className="text-white text-md">
              Email
            </Label>
            <input
              type="email"
              id="email"
              className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
              placeholder="user@example.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 mb-4">
            <Label htmlFor="password" className="text-white text-md">
              Password
            </Label>
            <input
              type="password"
              id="password"
              className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5">
            <Label htmlFor="confirm" className="text-white text-md">
              Confirm Password
            </Label>
            <input
              type="password"
              id="confirm"
              className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <Link
            to="#"
            onClick={handleLoginClick}
            className="text-white text-lg hover:underline mt-4 block "
          >
            Already have an account?
          </Link>
          <div className="flex justify-center items-center mt-8">
            <button
              className="bg-gray-900 text-white text-xl rounded-lg px-8 py-4"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
