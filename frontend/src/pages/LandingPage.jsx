import { useEffect, useState } from "react";
import emergencyPic from "../assets/emergency.jpg";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.clientAuthReducer.user);

  // Redirect user to report page if already logged in
  useEffect(() => {
    if (user) {
      navigate("/emergency");
    }
  }, []);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  function toggleSignUp() {
    setIsSignUp((prev) => !prev);
  }

  function toggleSignIn() {
    setIsSignIn((prev) => !prev);
  }

  return (
    <>
      <section className="min-h-[100vh] w-full md:flex md:flex-col md:justify-center">
        <section className="container pt-6 grid grid-cols-1 gap-4 h-full md:grid-cols-2">
          <article>
            <h1 className="text-4xl text-stone-800 font-extrabold mb-2 md:text-6xl">
              <span className="text-red-600 font-extrabold">Emergency</span>
              &nbsp; Report & Reponse System
            </h1>
            <p className="text-stone-700 mb-8 ">
              Report any emergency case with ease and get realtime response!!!
            </p>
            <p className="text-stone-800 text-xl mb-2 font-bold">
              Follow the following steps to easily report an emergency case
            </p>
            <ol className="list-decimal list-inside mb-8">
              <li>Sign in or sign up</li>
              <li>Report your emergency case</li>
            </ol>

            <section className="flex flex-col gap-2 md:flex-row">
              <button onClick={toggleSignIn} className="w-full bg-blue-800">
                Sign In
              </button>
              <button onClick={toggleSignUp} className="w-full">
                Sign Up
              </button>
            </section>
          </article>
          <img className="rounded shadow-lg" src={emergencyPic} alt="" />
        </section>
      </section>

      {/* Sign  In */}
      {isSignIn && <SignIn toggleSignIn={toggleSignIn} />}

      {/* Sign Up */}
      {isSignUp && <SignUp toggleSignUp={toggleSignUp} />}
    </>
  );
};

export default LandingPage;
