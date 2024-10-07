"use client";
import React, { useEffect, useState } from "react";
import { BiChevronsRight } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { BiCaretRight } from "react-icons/bi";
import Image from "next/image";
import { ClockLoader } from "react-spinners";
import Link from "next/link";
import axios from "axios";
import { Checkmark } from "react-checkmark";
import logo from "@/public/images/default_img.jpg";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  EmailIcon,
} from "react-share";
const Quiz = ({ data }) => {
  const router = useRouter();
  const { questions = [] } = data || {};
  const [index, setIndex] = useState(0);
  const [SelectedAns, setSelectedAns] = useState("");
  const [CorrectAns, setCorrectAns] = useState(0);
  const [FalseAns, setFalseAns] = useState(0);
  const [quizAtempt, setQuizAtempt] = useState(false);
  const [loading, setloading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [Average, setAverage] = useState(0.0);
  const [UserDetal, setUserDetal] = useState(null || []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDetails = localStorage.getItem("userDetail");
      if (userDetails) {
        try {
          const parsedDetails = JSON.parse(userDetails);
          setUserDetal(parsedDetails);
        } catch (error) {
          console.error("Error parsing user details:", error);
        }
      }
    }
  }, []);

  const saveTotalPlay = async (id) => {
    try {
      const response = await axios.put(`/api/v1/Quiz?id=${id}&playTime=true`);
      setloading(false);
    } catch (error) {
      console.error("Error updating totalPlayed:", error);
    }
  };

  const UpdateData = {
    email: UserDetal.email,
    lastPlayed: data.title,
    lastPlayedScore: Average,
  };
  const UserPerformanceUpdate = async () => {
    if (typeof window !== "undefined") {
      const IsLogin = localStorage.getItem("UserLogin");
      if (IsLogin) {
        setSaving(true);
        setloading(true);

        const UpdateData = {
          email: UserDetal?.email,
          lastPlayed: data.title,
          lastPlayedScore: Average,
        };

        try {
          const endpoint = Average < 50 ? "loss=true" : "Gamewin=true";
          await axios.put(
            `/api/v1/UserPerormanceUpdate?${endpoint}`,
            UpdateData
          );
          setSaved(true);
          setSaving(false);
        } catch (error) {
          console.error("Error updating performance:", error);
        }
      } else {
        alert("Please Login First");
      }
    }
  };
  const getCurrentUrl = () => {
    // Ensure this runs only in the client-side environment
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return null; // Return null if it's running on the server-side
  };

  return (
    <>
      <div className="flex  items-center justify-between px-10 mb-4 py-2 sm:flex-col sm:items-end">
        <div className="flex items-center sm:flex-col sm:items-start">
          <div className="flex items-center justify-center pe-5  py-5 ">
            <p
              className="bg-darkBlue rounded flex pe-4 items-center text-sm  text-white px-3 py-2 cursor-pointer"
              onClick={() => router.back()}>
              <FaAngleLeft />
              Back
            </p>
          </div>
          <span className="flex flex-col text-text">
            <p className="text-2xl flex items-center  font-semibold">
              {data.title}
            </p>
            <p>{data.desc}</p>
          </span>
        </div>
        <Image
          src={data.imgUrl || logo}
          width={120}
          alt="img"
          loading="lazy"
          height={120}
          className="rounded-lg "
        />
      </div>
      {loading && (
        <div className="flex justify-center">
          <div className="z-[10000] flex flex-col w-3/5  px-5 rounded-lg  bg-text pt-10 pb-5 mb-10 sm:w-5/6 sm:px-2">
            <div className="h-[50dvh] bg-text flex flex-col gap-5 items-center justify-center">
              {!saved && (
                <ClockLoader
                  color={"#ffffff"}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
              {!saving && !saved && quizAtempt && (
                <p className="text-2xl font-semibold text-white">
                  Calculating Result.
                </p>
              )}

              {saving && (
                <p className="text-2xl font-semibold text-white">
                  Quiz Saving.
                </p>
              )}
              {saved && (
                <>
                  <Checkmark size="xLarge" />
                  <p className="text-2xl font-semibold text-white">
                    Congratulations Quiz Saved.
                  </p>
                  <div>
                    <Link href="/Profile">
                      <button className=" mt-3 float-end px-5 py-2 rounded bg-white hover:bg-white/95  outline outline-text/5 outline-1 mx-4 cursor-pointer sm:text-base sm:px-3">
                        Go to Profile
                      </button>
                    </Link>
                    <Link href="/">
                      <button className=" mt-3 float-end px-5 py-2 rounded bg-white hover:bg-white/95  outline outline-text/5 outline-1 mx-4 cursor-pointer sm:text-base sm:px-3">
                        Back to Home
                      </button>
                    </Link>
                  </div>
                </>
              )}
              {!saved && (
                <p className="text-xl text-white/90">Please Wait...</p>
              )}
            </div>
          </div>
        </div>
      )}
      {!quizAtempt && !loading && (
        <div className="flex justify-center">
          <div className="flex flex-col w-3/5  px-5 rounded-lg  bg-text pt-10 pb-5 mb-10 sm:w-5/6 sm:px-2">
            <div className="flex justify-between items-center gap-x-2 ">
              <p className=" text-2xl flex items-center font-black sm:font-medium sm:text-xl sm:gap-x-1 text-white">
                <BiCaretRight />
                {questions[index].questionTitle}.
              </p>
              <span className="text-white sm:text-base">
                <strong>{index + 1}</strong> of{" "}
                <strong>{data.questions.length}</strong> Questions
              </span>
            </div>

            <div className="flex flex-col gap-y-3 text-xl  text-text py-3 mt-5">
              {Object.keys(questions[index])
                .filter((key) => key.startsWith("option")) // Filter only the keys that are options
                .map((key, idx) => (
                  <span
                    key={key} // Use the option key as the key for each span
                    onClick={() => {
                      setSelectedAns(key); // Set the exact option key (like "option1", "option2")
                    }}
                    className={`px-5 py-2 rounded mx-4 cursor-pointer 
              ${
                SelectedAns === key
                  ? "bg-white text-black"
                  : "bg-white/20 hover:bg-white/35 text-white"
              } 
              outline outline-text/5 outline-1 sm:text-base`}>
                    {idx + 1} : {questions[index][key]}{" "}
                    {/* Dynamically access the option value */}
                  </span>
                ))}
            </div>

            <div>
              <button
                onClick={() => {
                  if (SelectedAns !== "") {
                    // Check if the answer is correct or false
                    if (SelectedAns === questions[index].correctOption) {
                      setCorrectAns(CorrectAns + 1);
                    } else {
                      setFalseAns(FalseAns + 1);
                    }
                  }

                  // Check if it's the last question
                  if (index + 1 === questions.length) {
                    // Save the play count (after state updates)
                    saveTotalPlay(data._id);
                    setQuizAtempt(true);
                    setloading(true);

                    // Delay the calculation to ensure state updates are applied first
                    setTimeout(() => {
                      // Recalculate the average after the last question
                      setAverage(
                        (
                          ((CorrectAns +
                            (SelectedAns === questions[index].correctOption
                              ? 1
                              : 0)) /
                            questions.length) *
                          100
                        ).toFixed(2)
                      );
                    }, 1000);
                  } else if (index < questions.length) {
                    setloading(true);
                    setTimeout(() => {
                      setloading(false);
                      setIndex(index + 1); // Move to the next question
                      setSelectedAns(""); // Reset selected answer
                    }, 1000);
                  }
                }}
                className="mt-3 float-end px-5 py-2 rounded bg-white hover:bg-white/95 outline outline-text/5 outline-1 mx-4 cursor-pointer sm:text-base sm:px-3">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {quizAtempt && !loading && (
        <>
          <div className="flex justify-center">
            <div className="flex flex-col w-3/5  px-5 rounded-lg  bg-text pt-5 pb-5 mb-10 sm:w-5/6 sm:px-2">
              <p className="text-white font-black text-2xl text-center">
                Quiz Summary
              </p>
              <hr className="my-4 text-white" />
              <p className="text-white text-xl mt-3 flex justify-between px-10">
                Total Number of Questions : <strong>{questions.length}</strong>
              </p>
              <p className="text-white text-xl mt-3 flex justify-between px-10">
                Correct Answers : <strong>{CorrectAns}</strong>
              </p>
              <p className="text-white text-xl mt-3 flex justify-between px-10">
                False Answers : <strong>{FalseAns}</strong>
              </p>
              <p className="text-white text-xl mt-3 flex justify-between px-10">
                Averge Score : <strong>{Average}%</strong>
              </p>

              <p className="text-white text-xl mt-3 flex justify-between px-10">
                Status :
                <strong>
                  {Average < 50 ? (
                    <p className="text-red">Loss</p>
                  ) : (
                    <p className="text-green">win</p>
                  )}
                </strong>
              </p>
              <div>
                <button
                  onClick={() => {
                    UserPerformanceUpdate();
                  }}
                  className=" mt-3 float-end px-5 py-2 rounded bg-white hover:bg-white/95  outline outline-text/5 outline-1 mx-4 cursor-pointer sm:text-base sm:px-3">
                  Save Quiz Score
                </button>

                <Link href="/">
                  <button className=" mt-3 float-end px-5 py-2 rounded bg-white hover:bg-white/95  outline outline-text/5 outline-1 mx-4 cursor-pointer sm:text-base sm:px-3">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2 items-center px-10 ">
          <p className="font-medium text-text text-xl sm:text-sm pe-2 flex pb-2">
            Share with Friends:
          </p>
          <ul className="flex gap-2   ">
            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <FacebookShareButton
                url="https://www.npmjs.com/package/react-share" // The URL you want to share
                quote={`Check out this new amazing quiz!\n Title: ${data.title}\n Desc:${data.desc} `} // Optional: A quote to accompany the share
                hashtag={data.tags} // Optional: A hashtag to accompany the share
              >
                <FacebookIcon size={25} round />
              </FacebookShareButton>
            </li>

            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <WhatsappShareButton
                url={getCurrentUrl()}
                title={`Check out this amazing quiz!\nTitle: ${data.title}\n`} // Message to send
              >
                <WhatsappIcon size={25} round />
              </WhatsappShareButton>
            </li>

            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <EmailShareButton
                url={getCurrentUrl()}
                subject={`Check out this amazing quiz: ${data.title}`}
                body={`Check out this amazing quiz!\nTitle: ${data.title}\nDesc: ${data.desc}`}>
                <EmailIcon size={25} round />
              </EmailShareButton>
            </li>

            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <LinkedinShareButton url={getCurrentUrl()}>
                <LinkedinIcon size={25} round />
              </LinkedinShareButton>
            </li>

            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <RedditShareButton url={getCurrentUrl()}>
                <RedditIcon size={25} round />
              </RedditShareButton>
            </li>

            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <TelegramShareButton url={getCurrentUrl()}>
                <TelegramIcon size={25} round />
              </TelegramShareButton>
            </li>

            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <TumblrShareButton url={getCurrentUrl()}>
                <TumblrIcon size={25} round />
              </TumblrShareButton>
            </li>

            <li className="cursor-pointer text-text/90 text-xl group hover:translate-y-[-5px] transition ease-in">
              <TwitterShareButton
                url={getCurrentUrl()}
                title={`Check out this amazing quiz!\nTitle: ${data.title}`}>
                <TwitterIcon size={25} round />
              </TwitterShareButton>
            </li>
          </ul>
        </div>
        <div className="flex gap-1 overflow-hidden px-10 items-center">
          <div className="flex flex-wrap gap-2">
            <p className="font-medium text-text text-xl sm:text-sm pe-5">
              Tags :
            </p>
            {data.tags.map((tag, index) => {
              return (
                <p
                  key={index}
                  className="bg-darkGreen/70 font-medium cursor-pointer text-black px-3 py-2 rounded text-xs hover:bg-darkGreen transition ease-in">
                  {tag}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
