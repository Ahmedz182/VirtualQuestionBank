"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import QuizCard from "@/app/_components/QuizCard";
import Title from "@/app/_components/Title";
import { Skeleton } from "antd";
import Filter from "@/app/_components/Filter";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";

const SubjectId = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState([] || null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleFilterChange = (value) => {
    setSelectedDifficulty(value);
  };
  useEffect(() => {
    loadQuiz();
  }, []); // Removed extra comma after id

 

  const loadQuiz = async () => {
    try {
      const response = await axios.get(`/api/v1/Quiz?subject=${id}`);
      if (response.data && response.data.quiz) {
        setQuizData(response.data.quiz);
      } else {
        console.warn("No quiz data found in the response");
      }
    } catch (error) {
      console.error("Error getting quiz:", error);
    }
  };
  const subjectName = decodeURIComponent(id)
    .replace(/%20/g, " ")
    .replace(/%26/g, "&");

  return (
    <div>
      <div className="flex justify-between items-center pe-5 sm:flex-col">
        <Title
          title="Get what you need!"
          tagline={<>Best Quiz According to {subjectName}</>}
        />

        <div className="flex sm:my-2 ">
          <div className="flex h-12 md:h-10 sm:h-10  shadow-inner outline outline-1 outline-text/20 bg-white rounded-lg ps-4 sm:ps-3 md:ps-3 ">
            <input
              className="w-[40dvw] md:w-[58dvw] sm:w-[90dvw] bg-white   h-12 sm:h-10 md:h-10  outline-none md:text-sm sm:text-sm sm:ps-3 md:ps-1 ps-1 pe-2 sm:pe-0"
              type="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search Quiz here.."
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

export default SubjectId;
