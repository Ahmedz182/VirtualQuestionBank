import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";

const Filter = ({ onFilterChange }) => {
  const handleSelectChange = (e) => {
    onFilterChange(e.target.value); // Pass the selected value to the parent
  };

  return (
    <>
      <div className="flex justify-between px-10 sm:pe-3 sm:ps-8 mb-4">
        <p className="text-text text-lg flex items-center gap-2">
          Filter
          <LuSettings2 className="ri-equalizer-line text-text"></LuSettings2>
        </p>

        <span className="p-1 rounded flex items-center gap-x-3">
          <p className="font-medium text-text/60 flex items-center gap-2">
            Difficulty:
            <IoFilterOutline className="text-text"></IoFilterOutline>
          </p>

          <select
            name="level"
            id="level"
            className="bg-text rounded p-1 text-white"
            onChange={handleSelectChange}>
            <option className="bg-text" value="" disabled selected>
              Select Level
            </option>
            <option className="bg-text" value="Easy">
              Easy
            </option>
            <option className="bg-text" value="Medium">
              Medium
            </option>
            <option className="bg-text" value="Hard">
              Hard
            </option>
          </select>
        </span>
      </div>
    </>
  );
};

export default Filter;
