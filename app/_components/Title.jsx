import React from "react";
import { TiMediaPlay } from "react-icons/ti";

const Title = ({ title, tagline }) => {
  return (
    <div className="px-10 sm:px-4 py-10 flex flex-col gap-y-2 tracking-wide ">
      <span className="flex text-5xl md:text-4xl sm:text-3xl items-center  tracking-wider">
        <p className="text-text/80">{title}</p>
      </span>
      <p className="text-xl ps-1 md:text-lg sm:text-sm text-text/40">
        {tagline}
      </p>
    </div>
  );
};

export default Title;
