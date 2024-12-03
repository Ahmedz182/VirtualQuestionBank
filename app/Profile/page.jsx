"use client";
import React, { useEffect, useState, useRef } from "react";
import Loading from "../loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import maleAvatar from "@/public/images/male.png";
import femaleAvatar from "@/public/images/female.png";
import axios from "axios";
import { ImSad } from "react-icons/im";
import Link from "next/link";
import UserReport from "../_components/UserReport";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import myLogo from "@/public/images/logo.png";

const Profile = () => {
  const [Login, setLogin] = useState(false);
  const [UserDetal, setUserDetal] = useState(null);
  const [UserPerformance, setUserPerformance] = useState(null);
  const [Avatar, setAvatar] = useState("");
  const router = useRouter();
  const reportRef = useRef(); // For referencing the UserReport component

  const LoadUserPerformance = async (userEmail) => {
    try {
      const response = await axios.post(
        "/api/v1/Auth/GetUser?profile=true",
        userEmail
      );
      setUserPerformance(response.data.performance);
    } catch (error) {
      console.error("Error While Fetching Data:", error);
    }
  };

  useEffect(() => {
    const checkLogin = localStorage.getItem("UserLogin");
    if (!checkLogin) {
      router.push("/auth/login");
    } else {
      setLogin(true);
      const userDetails = localStorage.getItem("userDetail");
      if (userDetails) {
        try {
          const parsedDetails = JSON.parse(userDetails);
          setUserDetal(parsedDetails);
          LoadUserPerformance({ email: parsedDetails.email });
        } catch (error) {
          console.error("Error parsing user details:", error);
        }
      }
    }
  }, [router]);

  useEffect(() => {
    if (UserDetal) {
      setAvatar(UserDetal.gender === "male" ? maleAvatar : femaleAvatar);
    }
  }, [UserDetal]);

  const generatePdf = async () => {
    const pdf = new jsPDF("landscape", "mm", "a4");

    // Add the header section
    pdf.setFontSize(16);
    pdf.text("Individual User Report Generated", 20, 20); // Add title
    pdf.setFontSize(12);
    pdf.text(
      `Generate Date: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      20,
      30
    ); // Add date

    // Add user details section
    pdf.setFontSize(14);
    pdf.text(`Name: Mr./Mrs ${UserDetal?.name || "N/A"}`, 20, 50); // Add user name
    pdf.text(`Email: ${UserDetal?.email || "N/A"}`, 20, 60); // Add user email
    pdf.text("Provided by: Virtual Question Bank", 150, 50); // Add provider
    pdf.text("Contact: info@virtualquestionbank.com", 150, 60); // Add contact info

    // Add user performance section
    pdf.setFontSize(12);
    pdf.text("Last Played Score", 20, 80);

    // Add the performance table headers
    pdf.text("Last Played Quiz", 20, 90);

    // Add the performance data
    pdf.text(UserPerformance[0]?.lastPlayed || "N/A", 20, 100);
    pdf.text(`${UserPerformance[0]?.lastPlayedScore || "N/A"}%`, 120, 100);

    // Add total stats section
    pdf.text("Total Stats", 20, 120);

    // Add total stats table headers
    pdf.text("Total Played Quiz", 20, 130);
    pdf.text("Total No. of Wins", 120, 130);
    pdf.text("Total No. of Loss", 220, 130);

    // Add total stats data
    pdf.text(`${UserPerformance[0]?.totalPlayed || "N/A"}`, 20, 140);
    pdf.text(`${UserPerformance[0]?.Win || 0}`, 120, 140);
    pdf.text(`${UserPerformance[0]?.loss || 0}`, 220, 140);

    // Add disclaimer
    pdf.text(
      "This is a Computer Generated Report and does not require any Signature.",
      20,
      160
    );
    pdf.text("All Rights Reserved by Virtual Question Bank", 100, 170);

    // Save the generated PDF
    pdf.save("user-report.pdf");
  };

  return (
    <>
      {Login ? (
        <div className="min-h-[75dvh]">
          <div className="flex sm:flex-col bg-gradient-to-r from-text to-text/80 text-white m-4 p-5 sm:px-2 rounded-full items-center justify-between sm:justify-center">
            <span className="flex gap-5 items-center">
              <Image
                src={Avatar}
                width={100}
                height={100}
                className="object-fill imgAvtor bg-silver/40"
                alt="Avatar"
                loading="lazy"
              />
              <p className="text-xl">
                Welcome Back 👋
                <br />
                <span className="font-semibold">{UserDetal?.name} !</span>
                <br />
                <span className="text-base">{UserDetal?.email}</span>
              </p>
            </span>

            <span className="sm:hidden me-4">
              <p className="font-medium">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <br />
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
            </span>
          </div>

          <div className="mx-5 my-2 p-5">
            {UserPerformance && UserPerformance.length > 0 ? (
              <div className="flex flex-col gap-y-3">
                <div className="flex justify-end">
                  <button
                    className="bg-text text-silver px-3 font-medium py-1 rounded"
                    onClick={generatePdf}>
                    Generate Report
                  </button>
                </div>

                {/* Other Performance Data */}
                <div className="drop-shadow-xl px-5 py-10 bg-text rounded-xl cursor-pointer hover:bg-text/90 transition ease-in bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                  <p className="text-lg text-white flex justify-between">
                    Last Played Quiz:{" "}
                    <span className="tracking-wide font-black">
                      {UserPerformance[0].lastPlayed}
                    </span>
                  </p>
                </div>
                <div className="flex gap-5 justify-between sm:flex-col">
                  <div className="drop-shadow-xl px-5 py-10 bg-lightGreen text-black w-[48dvw] sm:w-[82dvw] rounded-xl cursor-pointer transition ease-in hover:scale-95 bg-[linear-gradient(to_right,#03030317_1px,transparent_1px),linear-gradient(to_bottom,#03030317_1px,transparent_1px)] bg-[size:24px_24px]">
                    <p className="text-xl flex font-semibold justify-between gap-x-10">
                      Last Played Score:{" "}
                      <span className="tracking-wide font-black text-3xl">
                        {UserPerformance[0].lastPlayedScore} %
                      </span>
                    </p>
                  </div>
                  <div className="drop-shadow-xl px-5 py-10 bg-purple/80 text-black w-[48dvw] sm:w-[82dvw] rounded-xl cursor-pointer transition ease-in hover:scale-95 bg-[linear-gradient(to_right,#ffffff2a,transparent_1px),linear-gradient(to_bottom,#ffffff2a,transparent_1px)] bg-[size:24px_24px]">
                    <p className="text-xl text-white flex font-semibold justify-between gap-x-10">
                      Total Played Quiz:{" "}
                      <span className="tracking-wide font-black text-3xl">
                        {UserPerformance[0].totalPlayed}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 justify-between sm:flex-col">
                  <div className="drop-shadow-xl px-5 py-10 w-[48dvw] sm:w-[82dvw] bg-midnight rounded-xl cursor-pointer transition ease-in hover:scale-95 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                    <p className="text-xl text-white font-semibold flex justify-between gap-x-10">
                      No. of Wins 🎉:{" "}
                      <span className="tracking-wide font-black text-3xl text-green">
                        {UserPerformance[0].Win || 0}
                      </span>
                    </p>
                  </div>
                  <div className="drop-shadow-xl px-5 py-10 w-[48dvw] sm:w-[82dvw] bg-tahiti rounded-xl cursor-pointer transition ease-in hover:scale-95 bg-[linear-gradient(to_right,#ffffff2a,transparent_1px),linear-gradient(to_bottom,#ffffff2a,transparent_1px)] bg-[size:24px_24px]">
                    <p className="text-xl font-semibold flex justify-between gap-x-10">
                      No. of Losses 😞:{" "}
                      <span className="tracking-wide font-black text-3xl text-red">
                        {UserPerformance[0].loss || 0}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-y-5 min-h-[40dvh]">
                <ImSad className="text-8xl" />
                <p className="text-2xl font-semibold text-text">
                  No data available Yet !!
                </p>
                <Link href="/Quiz">
                  <button className="bg-text text-silver px-3 font-medium py-1 rounded">
                    Play Quiz
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
