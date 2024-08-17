import { useNavigate } from "react-router-dom";
import emergencyPic from "../assets/emergency.jpg";

const Login = () => {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginCredentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(loginCredentials);
    navigate("/dashboard");
  }
  return (
    <section className="min-h-[100vh] w-full md:flex md:flex-col md:justify-center">
      <section className="container pt-6 grid grid-cols-1 gap-4 h-full md:grid-cols-2">
        <article>
          <h1 className="text-8xl text-blue-800 font-extrabold mb-2">
            <span className="text-red-600 font-extrabold">E</span>
            RR
          </h1>

          <h1 className="hidden text-2xl text-stone-600 font-extrabold mb-2 md:block ">
            Emergency Report & Reponse System
          </h1>
          <p className="text-stone-800 text-3xl my-6 mt-10 font-bold">Admin</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
