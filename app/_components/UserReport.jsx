import React from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";

const UserReport = ({ User, UserPerformance }) => {
  return (
    <>
      <div className="flex flex-col justify-between text-text rounded p-10 min-h-[2024px]">
        <div>
          {/* Header Section */}
          <div className="flex justify-between items-center ">
            <span className="flex items-center gap-x-5">
              <Image src={logo} alt="logo" className="h-20 w-20 " />
              <p className="font-black text-2xl uppercase">
                Individual User Report Generated
              </p>
            </span>
            <p className="text-lg">
              <strong> Generate Date : </strong>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              {" - "}
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* User Details Section */}
          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold text-xl">
                Name :{" "}
                <strong className="uppercase">Mr./Mrs {User.name}</strong>
              </p>
              <p className="font-medium text-xl">
                Email : <strong>{User.email}</strong>
              </p>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold text-xl">
                Provided by :{" "}
                <strong className="uppercase">Virtual Question Bank</strong>
              </p>
              <p className="font-medium text-xl">
                Contact : <strong>info@virtualquestionbank.com</strong>
              </p>
            </div>
          </div>

          <div className="my-10"></div>

          {/* Performance Table */}

          <p className="py-5 text-xl font-bold">Last Played Score</p>
          <table className="table-auto text-xl w-full text-left border items-center ">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Last Played Quiz</th>
                <th className="px-4 py-2 border">Last Played Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-semibold">
                <td className="px-4 py-2 border">
                  {UserPerformance[0].lastPlayed}
                </td>
                <td className="px-4 py-2 border">
                  {UserPerformance[0].lastPlayedScore}%
                </td>
              </tr>
            </tbody>
          </table>

          {/* Additional Table */}
          <p className="py-5 text-xl font-bold mt-24">Total Stats</p>
          <table className="table-auto text-xl w-full text-left  border items-center ">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Total Played Quiz</th>

                <th className="px-4 py-2 border">Total No.of Wins</th>
                <th className="px-4 py-2 border">Total No.of Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-black">
                <td className="px-4 py-2 border">
                  {UserPerformance[0].totalPlayed}
                </td>
                <td className="px-4 py-2 border text-darkGreen">
                  {UserPerformance[0].Win || 0}
                </td>
                <td className="px-4 py-2 border text-red">
                  {UserPerformance[0].loss || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Section (Always at the Bottom) */}
        <div className="mt-24">
          <p>
            This is a Computer Generated Report and does not require any
            Signature.
          </p>
          <p className="text-center mt-5">
            All Rights Reserved by <strong>Virtual Question Bank</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserReport;
