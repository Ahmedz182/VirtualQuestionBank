import React from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";

const UserReport = ({ User, UserPerformance }) => {
  return (
    <>
      <div className="flex flex-col justify-between text-text rounded p-5 sm:p-10">
        <div>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <span className="flex items-center gap-x-3 sm:gap-x-5">
              <Image src={logo} alt="logo" className="h-12 w-12 " />
              <p className="font-black text-lg sm:text-2xl uppercase">
                Individual User Report Generated
              </p>
            </span>
            <p className="text-sm sm:text-lg mt-3 sm:mt-0">
              <strong> Generate Date : </strong>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              -{" "}
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* User Details Section */}
          <div className="flex flex-col sm:flex-row justify-between mt-5 gap-y-3">
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold text-lg sm:text-xl">
                Name :{" "}
                <strong className="uppercase">Mr./Mrs {User?.name}</strong>
              </p>
              <p className="font-medium text-lg sm:text-xl">
                Email : <strong>{User?.email}</strong>
              </p>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold text-lg sm:text-xl">
                Provided by :{" "}
                <strong className="uppercase">Virtual Question Bank</strong>
              </p>
              <p className="font-medium text-lg sm:text-xl">
                Contact : <strong>info@virtualquestionbank.com</strong>
              </p>
            </div>
          </div>

          <div className="my-5 sm:my-10"></div>

          {/* Performance Table */}
          <p className="py-3 sm:py-5 text-lg sm:text-xl font-bold">
            Last Played Score
          </p>
          <div className="overflow-x-auto">
            <table className="table-auto text-sm sm:text-xl w-full text-left border items-center">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4 py-2 border">Last Played Quiz</th>
                  <th className="px-2 sm:px-4 py-2 border">
                    Last Played Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-semibold">
                  <td className="px-2 sm:px-4 py-2 border">
                    {UserPerformance[0]?.lastPlayed}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">
                    {UserPerformance[0]?.lastPlayedScore}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Table */}
          <p className="py-3 sm:py-5 text-lg sm:text-xl font-bold mt-12 sm:mt-24">
            Total Stats
          </p>
          <div className="overflow-x-auto">
            <table className="table-auto text-sm sm:text-xl w-full text-left border items-center">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4 py-2 border">
                    Total Played Quiz
                  </th>
                  <th className="px-2 sm:px-4 py-2 border">
                    Total No. of Wins
                  </th>
                  <th className="px-2 sm:px-4 py-2 border">
                    Total No. of Losses
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-black">
                  <td className="px-2 sm:px-4 py-2 border">
                    {UserPerformance[0]?.totalPlayed}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border text-darkGreen">
                    {UserPerformance[0]?.Win || 0}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border text-red">
                    {UserPerformance[0]?.loss || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 sm:mt-24 mb-5">
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
