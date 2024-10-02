"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { Tooltip, Modal } from "antd";
import logo from "@/public/images/default_img.jpg";

import useAuth from "../hooks/useAuth";
import axios from "axios";
import Loading from "../loading";
import { message } from "antd";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [Login, setLogin] = useState(false);
  const [Apiquiz, setApiQuiz] = useState([] || null);
  useAuth();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const storedData = localStorage.getItem("Quiz");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setQuizzes(parsedData);
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }

    dataLoad();

    const checkLogin = localStorage.getItem("Login");
    checkLogin ? setLogin(true) : setLogin(false);
  }, []);
  const dataLoad = async () => {
    try {
      const response = await axios.get("/api/v1/Quiz");
      console.log(response.data.quiz);

      setApiQuiz(response.data.quiz);
    } catch (error) {
      console.error("Error loading quiz:", error);
    }
  };
  const DelData = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/Quiz?id=${id}`);
      console.log(response);
      setApiQuiz(Apiquiz.filter((quiz) => quiz._id !== id));
      messageApi.success("Quiz Deleted Successfully.");
    } catch (error) {
      console.error("Error Deleting quiz:", error);
    }
  };

  const EditData = async (id) => {
    try {
      router.push(`/Dashboard/addQuiz/${id}`);
    } catch (error) {
      console.error("Error Editing quiz:", error);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this quiz?",
      content: "This action cannot be undone.",
      onOk: () => {
        DelData(id);
      },
    });
  };

  const handleEdit = (id) => {
    Modal.confirm({
      title: "Are you sure you want to Edit this quiz?",
      // content: "This action cannot be undone.",
      onOk: () => {
        EditData(id);
      },
    });
  };

  return (
    <>
      {contextHolder}
      {Login ? (
        <div className="text-text flex flex-col">
          <div className="flex items-center p-10 justify-between">
            <p className="text-4xl font-semibold">Dashboard</p>
            <span className="flex gap-x-2">
              <Link href="/Dashboard/addQuiz">
                <p className="bg-darkBlue rounded text-white px-4 py-2 cursor-pointer">
                  Add Quiz
                </p>
              </Link>
              <Link href="/Dashboard/addSubject">
                <p className="bg-darkBlue rounded text-white px-4 py-2 cursor-pointer">
                  Add Subject
                </p>
              </Link>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mx-3 my-5">
            {Apiquiz && Apiquiz.length > 0 ? (
              Apiquiz.toReversed().map((quiz) => (
                <div
                  className="flex flex-col justify-center gap-2 w-[23dvw] sm:min-w-[65dvw] md:w-[40dvw] rounded-lg shadow outline outline-1 outline-text/10 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition ease-linear"
                  key={quiz._id}>
                  <Image
                    src={quiz.imgUrl || logo} // Fallback image if imgURL is missing
                    width={980}
                    height={450}
                    className="object-fill h-48 w-96"
                    alt={quiz.title || "Quiz Image"}
                    loading="lazy"
                  />
                  <span className="px-4 ">
                    <p className="text-text text-lg font-semibold line-clamp-1">
                      {quiz.title}
                    </p>

                    <span className="min-h-24">
                      <p className="text-text/80 font-medium">
                        Subject: <strong>{quiz.subject}</strong>
                      </p>
                      <span className="flex justify-between">
                        <p className="text-text/80 font-medium">
                          total Questions:
                          <strong>{quiz.questions.length}</strong>
                        </p>
                        <p className="text-text/80 font-medium">
                          Difficulty:
                          <strong>{quiz.difficulty}</strong>
                        </p>
                      </span>
                      <p className="text-text/50 line-clamp-1">{quiz.desc}</p>
                    </span>
                  </span>

                  <div className="flex justify-end items-center gap-x-1 p-3">
                    <Tooltip title="Edit">
                      <GrEdit
                        className="text-text text-xl hover:font-semibold transition ease-in"
                        onClick={() => handleEdit(quiz._id)}
                      />
                    </Tooltip>

                    <Tooltip title="Delete">
                      <MdOutlineDeleteForever
                        className="text-red text-2xl hover:font-semibold transition ease-in"
                        onClick={() => handleDelete(quiz._id)}
                      />
                    </Tooltip>
                  </div>
                </div>
              ))
            ) : (
              <p>No Quiz data available</p>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dashboard;
