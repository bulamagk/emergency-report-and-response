const SignIn = ({ toggleSignIn }) => {
  function handleClose() {
    toggleSignIn();
  }
  return (
    <section className="overlay absolute inset-0">
      <article className="container bg-white p-8 mt-8 rounded-sm block mx-auto  w-full md:w-2/3 lg:w-1/3">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-stone-800 text-2xl font-bold">Sign In</h2>
          <button onClick={handleClose} className="hover:bg-red-800">
            Close
          </button>
        </header>
        <form className="flex flex-col gap-6">
          <section className="form-group">
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" id="email" required />
          </section>
          <section className="form-group">
            <button className="bg-blue-800 hover:bg-blue-950" type="submit">
              Sign In
            </button>
          </section>
        </form>
      </article>
    </section>
  );
};

export default SignIn;
