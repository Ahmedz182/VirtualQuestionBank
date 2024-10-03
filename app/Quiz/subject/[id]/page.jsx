"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import QuizCard from "@/app/_components/QuizCard";
import Title from "@/app/_components/Title";
import { Skeleton } from "antd";
import Filter from "@/app/_components/Filter";

const SubjectId = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState([] || null);
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
      <div>
        <Title
          title="Get what you need!"
          tagline={
            <>
              Best Quiz According to "{subjectName}"<br />
              {/* There are total "{quizData.filter(selectedDifficulty).length}" */}
              Quiz Showing.
            </>
          }
        />
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
