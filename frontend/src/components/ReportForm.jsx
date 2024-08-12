import React from "react";

const ReportForm = ({ handleClose }) => {
  return (
    <section className="overlay absolute inset-0">
      <article className="container bg-white p-8 mt-8 rounded-sm block mx-auto  w-full md:w-2/3 lg:w-1/3">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-stone-800 text-2xl font-bold">
            Emergency Report
          </h2>
          <button
            onClick={handleClose}
            className="bg-blue-700 hover:bg-blue-900"
          >
            Close
          </button>
        </header>
        <form className="flex flex-col gap-6">
          <section className="form-group">
            <label htmlFor="emergency">Select emergency case</label>
            <select className="p-4 rounded-sm" name="emergency" id="emergency">
              <option value="Medical">Medical</option>
              <option value="Fire">Fire</option>
              <option value="Natural Disaster">Natural Disaster</option>
              <option value="Accident">Accident</option>
              <option value="Robbery">Robbery</option>
              <option value="Security">Security Threat</option>
              <option value="Other">Other</option>
            </select>
          </section>
          <section className="form-group">
            <label htmlFor="Description">
              Briefly describe your emergency case
            </label>
            <textarea
              className="border-2 border-slate-300 rounded-sm p-4 text-stone-800"
              name="description"
              id="description"
              maxLength={500}
            ></textarea>
          </section>
          <section className="form-group">
            <button className="bg-blue-800 hover:bg-blue-950" type="submit">
              Report
            </button>
          </section>
        </form>
      </article>
    </section>
  );
};

export default ReportForm;
