"use client";

import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import QuizCard from "../_components/QuizCard";
import axios from "axios";
import { Skeleton } from "antd";
import Title from "../_components/Title";

const Quiz = () => {
  const [Login, setLogin] = useState(false);
  const router = useRouter();
  const [QuizData, setQuizData] = useState([]);
  const [QuizDataLoad, setQuizDataLoad] = useState(false);
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
      <Title title="Explore Quiz" />

      <div className="flex flex-wrap gap-5 justify-around px-16 sm:px-4 bg-silver py-6 mb-16">
        {QuizDataLoad ? (
          QuizData.toReversed().map(
            ({
              _id,
              title,
              imgUrl,
              tags,
              questions,
              desc,
              totalPlayed,
              subject,
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
