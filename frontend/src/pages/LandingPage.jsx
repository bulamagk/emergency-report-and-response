import emergencyPic from "../assets/emergency.jpg";

const LandingPage = () => {
  return (
    <section className="min-h-[100vh] w-full md:flex md:flex-col md:justify-center">
      <section className="container pt-6 grid grid-cols-1 gap-4 h-full md:grid-cols-2">
        <articles>
          <h1 className="text-4xl text-stone-800 font-extrabold mb-2 md:text-6xl">
            <span className="text-red-600 font-extrabold">Emergency</span>
            &nbsp; Report & Reponse System
          </h1>
          <p className="text-stone-700 mb-8 ">
            Report any emergency case with ease and get realtime response!!!
          </p>
          <p className="text-stone-800 text-xl mb-2 font-bold">
            Follow the following steps to easily report and an emergency case
          </p>
          <ol className="list-decimal list-inside mb-8">
            <li>Sign in or sign up</li>
            <li>Report your emergency case</li>
          </ol>

          <section className="flex flex-col gap-2 md:flex-row">
            <button className="w-full bg-blue-800">Sign In</button>
            <button className="w-full">Sign Up</button>
          </section>
        </articles>
        <img className="rounded shadow-lg" src={emergencyPic} alt="" />
      </section>
    </section>
  );
};

export default LandingPage;
