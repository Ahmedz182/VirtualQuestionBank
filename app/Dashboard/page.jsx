"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";
import logo from "@/public/images/default_img.jpg";
import { Menu } from "antd";
import { Modal, Form, Input, message, Tooltip } from "antd";

import { HomeOutlined, DiffOutlined, UserAddOutlined } from "@ant-design/icons";

import useAuth from "../hooks/useAuth";
import axios from "axios";
import Loading from "../loading";
import AddUser from "./AddUser/page";

const Dashboard = () => {
  const items = [
    {
      label: "Statics",
      key: "dashboard",
      icon: <HomeOutlined />,
    },

    {
      label: "Quizies",
      key: "quiz",
      icon: <DiffOutlined />,
    },
    {
      label: "Subjects",
      key: "subject",
      icon: <DiffOutlined />,
    },
    {
      label: "Add User",
      key: "user",
      icon: <UserAddOutlined />,
    },
  ];

  const [current, setCurrent] = useState("dashboard");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const [quizzes, setQuizzes] = useState([]);
  const [AdminDetal, setAdminDetal] = useState(null);
  const [Login, setLogin] = useState(false);
  const [Apiquiz, setApiQuiz] = useState([] || null);
  const [ApiUser, setApiUser] = useState([] || null);
  const [ApiSubject, setApiSubject] = useState([] || null);
  useAuth();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subjectId, setSubjectId] = useState(null);
  const [form] = Form.useForm(); // Correct initialization of form

  // Function to handle form submission and PUT request
  const handleSave = async () => {
    try {
      const values = await form.validateFields(); // Get form values
      setLoading(true);

      // Send PUT request to update the subject by id
      await axios.put(`/api/v1/Subject/?id=${subjectId}`, values);

      message.success("Subject updated successfully!");
      setIsVisible(false); // Close the modal after successful update
      dataLoadSubject(); // Reload subjects after updating
    } catch (error) {
      console.error("Error updating subject:", error);
      message.error("Failed to update subject.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle modal open and load subject details
  const EditSubject = async (id) => {
    try {
      const response = await axios.get(`/api/v1/Subject?id=${id}`);
      const subjectData = response.data.subject; // Assuming 'subject' is the object from the response

      // Set form fields with subject data
      form.setFieldsValue({
        title: subjectData.title,
        desc: subjectData.desc,
        imgUrl: subjectData.imgUrl || "", // Optional field
      });

      setSubjectId(id); // Store the subject ID for updating
      setIsVisible(true); // Show the modal
    } catch (error) {
      console.error("Error fetching subject:", error);
      message.error("Failed to fetch subject data.");
    }
  };

  // Close the modal
  const onClose = () => {
    setIsVisible(false);
    form.resetFields(); // Reset form fields when the modal is closed
  };

  useEffect(() => {
    dataLoad();
    dataLoadSubject();
    dataLoadUser();
    const checkLogin = localStorage.getItem("Login");
    checkLogin ? setLogin(true) : setLogin(false);
    const adminDetails = localStorage.getItem("adminDetail");
    if (adminDetails) {
      try {
        const parsedDetails = JSON.parse(adminDetails);
        setAdminDetal(parsedDetails);
      } catch (error) {
        console.error("Error parsing user details:", error);
      }
    }
  }, []);
  const dataLoad = async () => {
    try {
      const response = await axios.get("/api/v1/Quiz");

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
  const DelSubject = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/Subject?id=${id}`);
      console.log(response);
      setApiSubject(ApiSubject.filter((subject) => subject._id !== id));
      messageApi.success("subject Deleted Successfully.");
    } catch (error) {
      console.error("Error subject quiz:", error);
    }
  };

  const EditData = async (id) => {
    try {
      router.push(`/Dashboard/addQuiz/${id}`);
    } catch (error) {
      console.error("Error Editing quiz:", error);
    }
  };

  const dataLoadSubject = async () => {
    try {
      const response = await axios.get("/api/v1/Subject");

      setApiSubject(response.data.subjects);
    } catch (error) {
      console.error("Error loading subjects:", error);
    }
  };
  const dataLoadUser = async () => {
    try {
      const response = await axios.post(`/api/v1/Auth/GetUser?UserCount=true`);

      setApiUser(response.data);
    } catch (error) {
      console.error("Error loading users Lenght:", error);
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
  const handleDeleteSubject = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Subject?",
      content: "This action cannot be undone.",
      onOk: () => {
        DelSubject(id);
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

  const handleEditSubject = (id) => {
    Modal.confirm({
      title: "Are you sure you want to Edit this Subject?",
      // content: "This action cannot be undone.",
      onOk: () => {
        EditSubject(id);
      },
    });
  };

  // Function to handle form submission and PUT request
  // const handleSave = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     setLoading(true);

  //     await axios.put(`/api/v1/Subject?id=${subjectId}`, values);

  //     message.success("Subject updated successfully!");
  //     onClose(); // Close the modal after successful update
  //   } catch (error) {
  //     console.error("Error updating subject:", error);
  //     message.error("Failed to update subject.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {contextHolder}
      {Login ? (
        <>
          <p className="text-4xl font-semibold px-10 py-5 text-text">
            Dashboard
          </p>
          <Menu
            className="px-10 mb-5 sm:px-5"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />

          <div className="text-text flex flex-col">
            {current == "dashboard" && (
              <div className="min-h-[40dvh] px-10 sm:px-7">
                <div className="flex sm:flex-col bg-midnight text-white px-12 mx-2 sm:mx-0   p-5 sm:px-2 rounded-lg items-center justify-between sm:justify-start">
                  <span className="flex gap-5 items-center">
                    <p className="text-xl">
                      Welcome Back 👋
                      <br />
                      <span className="font-semibold">
                        {AdminDetal.name || "Admin"} !
                      </span>
                      <br />
                      <span className="text-base">
                        {AdminDetal.email || "admin@admin.com"}
                      </span>
                    </p>
                  </span>

                  <span className="sm:hidden me-4">
                    <p className="font-medium">
                      {new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <br />
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mx-3 my-2 mb-5 ">
                  <div className="flex gap-5 justify-between  sm:flex-col">
                    <div className="drop-shadow-xl px-5 py-10 w-[30dvw] sm:w-[82dvw] bg-midnight rounded-xl cursor-pointer transition ease-in hover:scale-95 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                      <p className=" text-xl text-white font-semibold flex justify-between gap-x-10">
                        Total No. Quizes :
                        <span className="tracking-wide font-black text-3xl ">
                          {Apiquiz.length || 0}
                        </span>
                      </p>
                    </div>
                    <div className="drop-shadow-xl px-5 py-10 w-[30dvw] sm:w-[82dvw] bg-midnight rounded-xl cursor-pointer transition ease-in hover:scale-95 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                      <p className=" text-xl  font-semibold text-white flex justify-between gap-x-10">
                        Total No. of Subjects :
                        <span className="tracking-wide font-black text-3xl  ">
                          {ApiSubject.length || 0}
                        </span>
                      </p>
                    </div>
                    <div className="drop-shadow-xl px-5 py-10 w-[30dvw] sm:w-[82dvw] bg-midnight rounded-xl cursor-pointer transition ease-in hover:scale-95 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                      <p className=" text-xl  font-semibold flex text-white justify-between gap-x-10">
                        Total No. of Users :
                        <span className="tracking-wide font-black text-3xl  ">
                          {ApiUser.user}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {current === "quiz" && (
              <>
                <div className="flex items-center px-10 pb-5 justify-end">
                  <span className="flex gap-x-2">
                    <Link href="/Dashboard/addQuiz">
                      <p className="bg-darkBlue rounded text-white px-4 py-2 cursor-pointer">
                        Add Quiz
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
                            <p className="text-text/50 line-clamp-1">
                              {quiz.desc}
                            </p>
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
              </>
            )}

            {current === "subject" && (
              <>
                <div className="flex items-center px-10 pb-5 justify-end">
                  <span className="flex gap-x-2">
                    <Link href="/Dashboard/addSubject">
                      <p className="bg-darkBlue rounded text-white px-4 py-2 cursor-pointer">
                        Add Subject
                      </p>
                    </Link>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mx-3 my-5">
                  {ApiSubject && ApiSubject.length > 0 ? (
                    ApiSubject.toReversed().map((subject) => (
                      <div
                        className="flex flex-col justify-center gap-2 w-[23dvw] sm:min-w-[65dvw] md:w-[40dvw] rounded-lg shadow outline outline-1 outline-text/10 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition ease-linear"
                        key={subject._id}>
                        <Image
                          src={subject.imgUrl || logo} // Fallback image if imgURL is missing
                          width={980}
                          height={450}
                          className="object-fill h-48 w-96"
                          alt={subject.title || "Subject Image"}
                          loading="lazy"
                        />
                        <span className="px-4 ">
                          <p className="text-text text-lg font-semibold line-clamp-1">
                            {subject.title}
                          </p>

                          <span className="min-h-24">
                            <p className="text-text/50 line-clamp-1">
                              {subject.desc}
                            </p>
                          </span>
                        </span>

                        <div className="flex justify-end items-center gap-x-1 p-3">
                          <Tooltip title="Edit">
                            <GrEdit
                              className="text-text text-xl hover:font-semibold transition ease-in"
                              onClick={() => handleEditSubject(subject._id)}
                            />
                          </Tooltip>

                          <Tooltip title="Delete">
                            <MdOutlineDeleteForever
                              className="text-red text-2xl hover:font-semibold transition ease-in"
                              onClick={() => handleDeleteSubject(subject._id)}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Subject Data available</p>
                  )}
                </div>

                <Modal
                  title="Edit Subject"
                  visible={isVisible}
                  onOk={handleSave}
                  onCancel={onClose}
                  confirmLoading={loading}>
                  <Form form={form} layout="vertical">
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[
                        { required: true, message: "Please input the title!" },
                      ]}>
                      <Input placeholder="Enter the title" />
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="desc"
                      rules={[
                        {
                          required: true,
                          message: "Please input the description!",
                        },
                      ]}>
                      <Input.TextArea placeholder="Enter the description" />
                    </Form.Item>

                    <Form.Item
                      label="Image URL"
                      name="imgUrl" // Ensure this matches the name used in setFieldsValue
                      rules={[
                        { type: "url", message: "Please enter a valid URL!" },
                      ]}>
                      <Input placeholder="Enter the image URL (optional)" />
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )}

            {current == "user" && <AddUser />}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dashboard;
