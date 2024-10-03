"use client";

import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import QuizCard from "../_components/QuizCard";
import axios from "axios";
import { Skeleton } from "antd";
import Title from "../_components/Title";
import { LuSearch } from "react-icons/lu";
import Filter from "../_components/Filter";

const Quiz = () => {
  const [Login, setLogin] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [QuizData, setQuizData] = useState([]);
  const [QuizDataLoad, setQuizDataLoad] = useState(false);

  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleFilterChange = (value) => {
    setSelectedDifficulty(value);
  };
  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const response = await axios.get("/api/v1/Quiz");
      setQuizData(response.data.quiz);
      setQuizDataLoad(!!true);
    } catch (error) {
      console.error("Error posting quiz:", error);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center pe-6 sm:flex-col md:flex-col  sm:justify-start sm:items-start sm:px-10">
        <span className="flex flex-col">
          <Title
            title="Explore Quiz"
            tagline={`  There are total ${QuizData.length} Quiz Showing.`}
          />
        </span>
        <div className="flex flex-col sm:mb-5 justify-end ">
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

      <div className="flex flex-wrap gap-5 justify-around px-16 sm:px-4 bg-silver py-6 mb-16">
        {QuizDataLoad ? (
          QuizData.filter(
            ({ difficulty }) =>
              !selectedDifficulty || difficulty === selectedDifficulty
          )
            .toReversed()
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
          <Skeleton />
        )}
      </div>
    </>
  );
};

export default Quiz;
