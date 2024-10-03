"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import QuizCard from "@/app/_components/QuizCard";
import Title from "@/app/_components/Title";
import { Skeleton } from "antd";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Filter from "@/app/_components/Filter";

const SearchId = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleFilterChange = (value) => {
    setSelectedDifficulty(value);
  };
  useEffect(() => {
    loadQuiz();
  }, [id]); // Removed extra comma after id

  // Log when quizData is updated
  useEffect(() => {
    console.log("quizData updated:", quizData);
  }, [quizData]);

  const loadQuiz = async () => {
    try {
      const response = await axios.get(`/api/v1/Quiz?search=${id}`);
      if (response.data && response.data.quiz) {
        setQuizData(response.data.quiz);
      } else {
        console.warn("No quiz data found in the response");
      }
    } catch (error) {
      console.error("Error getting quiz:", error);
    }
  };
  const searchText = decodeURIComponent(id)
    .replace(/%20/g, " ")
    .replace(/%26/g, "&");

  return (
    <div>
      <div className="flex justify-between items-center pe-6 sm:flex-col md:flex-col  sm:justify-start sm:items-start sm:px-10">
        <Title
          title="Search"
          tagline={`Searching Quiz about "${searchText}"`}
        />
        <div className="flex sm:mb-5 justify-end">
          <div className="flex h-12 md:h-10 sm:h-10 w-[40dvw] md:w-[58dvw] sm:w-[100dvw]   shadow-inner outline outline-1 outline-text/20 bg-white rounded-lg ps-4 sm:ps-3 md:ps-3 ">
            <input
              className="w-[40dvw] md:w-[58dvw] sm:w-[100dvw] bg-white   h-12 sm:h-10 md:h-10  outline-none md:text-sm sm:text-sm sm:ps-3 md:ps-1 ps-1 pe-2 sm:pe-0"
              type="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search Quiz here"
              name="search"
              id="search"
            />
            <span
              onClick={() => {
                router.push(`/Quiz/search/${search}`);
              }}
              className="bg-darkGreen cursor-pointer h-12 md:h-10 sm:h-10 w-16 p-3 flex items-center  justify-center rounded-br-lg rounded-tr-lg">
              <LuSearch className="text-white text-2xl md-text-xl sm:text-base" />
            </span>
          </div>
        </div>
      </div>
      <Filter onFilterChange={handleFilterChange} />
      <div className="flex flex-wrap gap-5 items-center justify-around px-16 sm:px-4 min-h-[40dvh] bg-silver py-6 mb-16">
        {quizData ? (
          quizData.length > 0 ? (
            quizData
              .filter(
                ({ difficulty }) =>
                  !selectedDifficulty || difficulty === selectedDifficulty
              )
              .map(
                ({
                  _id,
                  title,
                  imgUrl,
                  tags,
                  questions,
                  desc,
                  totalPlayed,
                  subject,
                  difficulty,
                }) => (
                  <QuizCard
                    key={_id}
                    QuizId={_id}
                    title={title}
                    subject={subject}
                    tag={tags}
                    img={imgUrl}
                    mcq={questions.length}
                    desc={desc}
                    totalPlayed={totalPlayed}
                    difficulty={difficulty}
                  />
                )
              )
          ) : (
            <p className="text-center">No Quiz found.</p> // Message when quizData is empty
          )
        ) : (
          <Skeleton /> // Shows skeleton loader while quizData is being fetched
        )}
      </div>
    </div>
  );
};

export default SearchId;
