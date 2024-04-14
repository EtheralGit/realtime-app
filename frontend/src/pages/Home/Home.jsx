import React from "react";
import Typewriter from "typewriter-effect";
import homevideo from "../../assets/homevideo.mp4";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000); // 1000 milliseconds = 1 second
  };
  return (
    <div className="h-[100vh] bg-black">
      <video src={homevideo} autoPlay muted loop></video>
      <div className="absolute top-[15rem] left-0 right-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center px-8">
          <div className="text-5xl text-prime font-semibold mb-2 ">
            <h1>RalChat.</h1>
          </div>
          <div className="text-white font-semibold text-3xl mb-12">
            <Typewriter
              options={{ delay: 50 }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("The Next Real Time Chat Application")
                  .start();
              }}
            />
          </div>
          <div onClick={handleClick}>
            <Button
              variant="outline"
              size="lg"
              className="btnAnimate opacity-0"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
