"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import QuizCard from "@/app/_components/QuizCard";
import Title from "@/app/_components/Title";

const SubjectId = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);

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
          tagline={`Best Quiz According to ${subjectName}`}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-around px-16 sm:px-4 bg-silver py-6 mb-16">
        {quizData ? (
          quizData.map(
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
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SubjectId;
