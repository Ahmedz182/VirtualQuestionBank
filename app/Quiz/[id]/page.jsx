"use client";
import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { useParams } from "next/navigation";
import axios from "axios";
import Quiz from "@/app/_components/Quiz";
import Title from "@/app/_components/Title";
import SubjectCard from "@/app/_components/SubjectCard";
import { Skeleton } from "antd";

const QuizAttempt = () => {
  const { id } = useParams();
  const [SubjectData, setSubjectData] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [subjectLoading, setSubjectLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
    loadSubject();
  }, []);

  const loadSubject = async () => {
    setSubjectLoading(true);
    try {
      const response = await axios.get("/api/v1/Subject");
      setSubjectData(response.data.subjects);
    } catch (error) {
      console.error("Error loading subjects:", error);
    } finally {
      setSubjectLoading(false);
    }
  };

  const loadQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/v1/Quiz?id=${id}`);
      if (response.data.quiz) {
        setQuizData(response.data.quiz);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error getting quiz:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (notFound) {
    return <div className="text-center p-10">Quiz not found..!</div>;
  }

  return (
    <div>
      {quizData ? (
        <>
          <Quiz data={quizData} />
          <Title
            title="Hot Subjects"
            tagline="Explore the Most Popular Subjects!"
          />
          <div className="pb-5 px-8 flex justify-around flex-wrap gap-3">
            {subjectLoading ? (
              <Skeleton />
            ) : SubjectData.length > 0 ? (
              SubjectData.slice(-10).map(({ id, title, imgUrl, desc }) => (
                <SubjectCard key={id} title={title} img={imgUrl} desc={desc} />
              ))
            ) : (
              <div>No subjects available</div> // Handle case with no subjects
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default QuizAttempt;
