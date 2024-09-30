"use client"

import HeroSection from "./_components/HeroSection";
import SubjectCard from "./_components/SubjectCard";
import Title from "./_components/Title";
import WhatWeOffer from "./_components/WhatWeOffer";
import QuizCard from "./_components/QuizCard";
import FAQSection from "./_components/FAQSection";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import Challange from "./_components/Challange";

export default function Home() {


  const [SubjectData, setSubjectData] = useState([])
  const [SubjectDataLoad, setSubjectDataLoad] = useState(false)
  const [QuizData, setQuizData] = useState([])
  const [QuizDataLoad, setQuizDataLoad] = useState(false)

  const loadSubject = async () => {
    try {
      const response = await axios.get("/api/v1/Subject");
      setSubjectData(response.data.subjects);
      setSubjectDataLoad(!!true);
    } catch (error) {
      console.error("Error posting quiz:", error);
    }
  }
  const loadQuiz = async () => {
    try {
      const response = await axios.get("/api/v1/Quiz");
      setQuizData(response.data.quiz);
      setQuizDataLoad(!!true);
    } catch (error) {
      console.error("Error posting quiz:", error);
    }
  }
  useEffect(() => {

    loadSubject();
    loadQuiz();

  }, [])
  return (
    <>
      <HeroSection />
      <Title title="What We Offer" tagline="Discover the best features of our quiz platform." />
      <WhatWeOffer />
      <div className="  flex md:flex-col sm:flex-col items-center gap-8 md:gap-4 sm:gap-4 justify-around   mt-10 mb-5 bg-silver   px-20 md:px-6 sm:px-2 pt-5 sm:py-5 overflow-hidden">
        <div className="w-1/3 md:w-full sm:w-full flex items-center justify-center">
          <iframe className="h-[30rem] w-[25dvw] md:h-[15rem] md:w-[90dvw] sm:h-[40rem] sm:w-[85dvw]" src="https://lottie.host/embed/9e2adae9-84aa-4e3c-86a5-b20d6edea93a/PowugWEcGS.json"></iframe>
        </div>
        <div className="flex flex-col gap-5 justify-start md:px-3 sm:px-5">
          <p className="text-text font-black text-4xl md:text-3xl sm:text-3xl items-center uppercase tracking-wider leading-tight">Discover Your True Potential with Every Question!
          </p>
          <p className="text-xl md:text-lg sm:text-base tracking-wide text-text/70 ">Every question is an opportunity to learn, grow, and challenge yourself. Our quizzes are designed to test your knowledge, spark your curiosity, and push you towards new heights. Whether you&aposre aiming to master a subject, prepare for an exam, or simply enjoy some mental exercise, our platform is here to help you unlock your true potential. Dive in, and see how much you can achieve with every question answered.</p>
        </div>
      </div>
      <Title title="Hot Subjects" tagline="Explore the Most Popular Subjects!" />
      <div className="pb-2 px-8 flex justify-around flex-wrap gap-3">

        {
          SubjectDataLoad ? (
            SubjectData.slice(-10).map(({ id, title, imgUrl, desc }) => (
              <SubjectCard key={id} title={title} img={imgUrl} desc={desc} />

            ))

          ) : (

            <Skeleton />
          )
        }

      </div>
      <Title title="Trending Quiz" tagline="Test Your Knowledge on Trending Topics Now!" />
      <div className="flex flex-wrap gap-5 justify-around px-10 sm:px-4 bg-silver py-6">

        {
          QuizDataLoad ? (
            QuizData.slice(-5).map(
              ({ _id, title, imgUrl, tags, questions, desc, totalPlayed, subject }) => (
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
          )
        }
      </div>

      <Challange />
      <Title title="FAQ" tagline="Quick Answers to Common Questions" />
      <FAQSection />
    </>
  );
}
