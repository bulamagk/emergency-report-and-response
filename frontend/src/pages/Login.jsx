import emergencyPic from "../assets/emergency.jpg";

const Login = () => {
  return (
    <section className="min-h-[100vh] w-full md:flex md:flex-col md:justify-center">
      <section className="container pt-6 grid grid-cols-1 gap-4 h-full md:grid-cols-2">
        <article>
          <h1 className="text-5xl text-stone-800 font-extrabold mb-10 md:hidden">
            <span className="text-red-600 font-extrabold">Emergency</span>
            &nbsp; Report & Reponse System
          </h1>
          <h1 className="hidden text-4xl text-stone-800 font-extrabold mb-2 md:block md:text-6xl">
            <span className="text-red-600 font-extrabold">Emergency</span>
            &nbsp; Report & Reponse System
          </h1>
          <p className="text-stone-700 text-3xl my-6 font-bold">Admin</p>
          <form className="flex flex-col gap-6">
            <section className="form-group">
              <label htmlFor="Email">Email</label>
              <input type="email" name="email" id="email" required />
            </section>
            <section className="form-group">
              <label htmlFor="Password">Password</label>
              <input type="password" name="password" id="password" required />
            </section>
            <section className="form-group">
              <button className="bg-blue-800 hover:bg-blue-950" type="submit">
                Sign In
              </button>
            </section>
          </form>
        </article>
        <img
          className="rounded shadow-lg hidden md:block"
          src={emergencyPic}
          alt=""
        />
      </section>
    </section>
  );
};

export default Login;
