import React from "react";

const PageTitle = ({ title }) => {
  return (
    <h2 className="text-2xl text-stone-700 font-semibold mb-6 md:text-3xl">
      {title}
    </h2>
  );
};

export default PageTitle;
