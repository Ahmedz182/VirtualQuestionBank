"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoMdArrowForward } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import { useRouter } from "next/navigation";
import logo from "@/public/images/default_img.jpg";
import { Menu, Skeleton } from "antd";
import { Modal, Form, Input, message, Tooltip } from "antd";
import jsPDF from "jspdf";
import {
  HomeOutlined,
  DiffOutlined,
  UserAddOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Loading from "../loading";
import AddUser from "./AddUser/page";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      label: "Users",
      key: "all-user",
      icon: <UserAddOutlined />,
    },
    {
      label: "Messages",
      key: "chat",
      icon: <MessageOutlined />,
    },
  ];

  const [current, setCurrent] = useState("dashboard");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const [quizzes, setQuizzes] = useState([]);
  const [AdminDetal, setAdminDetal] = useState(null);
  const [Login, setLogin] = useState(false);
  const [Apiquiz, setApiQuiz] = useState([] || null);
  const [ApiSubject, setApiSubject] = useState([] || null);
  const [email, setEmail] = useState(""); // State to hold email input
  // useAuth();
  const [form] = Form.useForm(); // Initialize form

  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [apiAllUser, setApiAllUser] = useState([]);
  const [Messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subjectId, setSubjectId] = useState(null); // Correct initialization of form

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
    dataLoadAllUsers();

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
      const responseMsg = await axios.get("/api/v1/messages?all=all");

      setApiQuiz(response.data.quiz);
      setMessages(responseMsg.data);
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

  // Function to load users with token
  const dataLoadAllUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token")?.replace(/"/g, ""); // Remove any quotes
    try {
      const response = await axios.get(`/api/v1/Auth/GetUser`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Assuming response structure has users under "users"
      setApiAllUser(response.data.users);
      setLoading(false);
      console.log(response.data.users); // Log the actual data received
    } catch (error) {
      console.error("Error loading users:", error);

      if (error.response) {
        // Check if the error is a 401 Unauthorized
        setLoading(true);
        if (error.response.status === 401) {
          // Clear local storage if the token is invalid or expired
          localStorage.removeItem("Login");
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          localStorage.removeItem("adminDetail");

          // Redirect to the login page or admin auth page
          window.location.href = "/auth/admin";
        }
        setLoading(false);
        console.error("Error details:", error.response.data); // Log server response
      } else {
        console.error("Error message:", error.message);
      }
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

  const handleDeleteUser = async (email) => {
    try {
      // Make a DELETE request with axios
      const response = await axios.delete(
        `/api/v1/Auth/GetUser?email=${email}`
      );

      const data = response.data;

      if (data.success) {
        alert(`User deleted: ${email}`);
        location.reload(); // Added parentheses to properly reload the page
        // Call the onDelete function passed from the parent to remove the user from the UI
      } else {
        console.error("Failed to delete user:", data.msg);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const showDeleteConfirm = (email) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: `This action will delete the user with email: ${email}.`, // Corrected template string
      okText: "Yes",
      cancelText: "No",
      onOk: () => handleDeleteUser(email), // Pass email directly here
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
  const generatePdf = async () => {
    const pdf = new jsPDF("portrait", "mm", "a4"); // Set to portrait orientation

    // Add the header section
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold"); // Set the font to Helvetica Bold for headings
    pdf.text("User Report Generated By Admin", 20, 20); // Title
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal"); // Reset to normal font for details

    pdf.text(
      `Generate Date: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      20,
      30
    ); // Date

    let startY = 40; // Starting Y position for user details
    const marginBottom = 20; // Space to leave at the bottom of the page

    // Loop through each user to add their details
    apiAllUser.forEach((user, index) => {
      const { name, email, role, performance } = user;

      // Check if there is enough space left on the page
      const pageHeight = pdf.internal.pageSize.height; // Total height of the page
      const availableHeight = pageHeight - startY - marginBottom; // Height left to the bottom of the page

      // Check if we have enough space for user details
      if (availableHeight < 50) {
        pdf.addPage(); // Add a new page
        startY = 20; // Reset Y position for new page
      }

      // User Detail Section
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold"); // Set the font to Helvetica Bold for headings
      pdf.text(`User ${index + 1} Detail:`, 20, startY); // Fixed index to start from 1
      startY += 5; // Small space after heading

      pdf.setFont("helvetica", "normal"); // Reset to normal font for details
      // Format for User Detail with commas
      pdf.text(
        `Role: ${role || "N/A"}, UserName: ${name || "N/A"}, Email: ${
          email || "N/A"
        }`,
        20,
        startY
      );

      startY += 10; // Space after user detail

      // Statistics Section
      pdf.setFont("helvetica", "bold"); // Make the heading bold
      pdf.text(`Statistics:`, 20, startY);
      startY += 5; // Small space after heading

      pdf.setFont("helvetica", "normal"); // Reset to normal font for stats

      // Extracting performance data
      const totalPlayed = performance[0]?.totalPlayed || 0;
      const totalWins = performance[0]?.win || 0;
      const totalLoss = performance[0]?.loss || 0;
      const lastPlayedQuiz = performance[0]?.lastPlayed || "N/A";
      const lastPlayedScore = `${performance[0]?.lastPlayedScore || "N/A"}%`;

      // Now combining all the stats in one line
      const xPosition = 20; // Starting X position for the stats
      const winColor = [0, 128, 0]; // Green color for Wins
      const lossColor = [255, 0, 0]; // Red color for Losses

      // Set color for Total Played (black by default)
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Total Played: ${totalPlayed}`, xPosition, startY);

      // Set color for Total Wins (green)
      const winXPosition =
        xPosition + pdf.getTextWidth(`Total Played: ${totalPlayed}`) + 5;
      pdf.setTextColor(winColor[0], winColor[1], winColor[2]);
      pdf.text(`Total Wins: ${totalWins}`, winXPosition, startY);

      // Set color for Total Loss (red)
      const lossXPosition =
        winXPosition + pdf.getTextWidth(`Total Wins: ${totalWins}`) + 5;
      pdf.setTextColor(lossColor[0], lossColor[1], lossColor[2]);
      pdf.text(`Total Loss: ${totalLoss}`, lossXPosition, startY);

      // Reset text color back to black after printing Total Loss
      pdf.setTextColor(0, 0, 0);

      startY += 10; // Space after stats

      // Add spacing between Last Played Quiz and Last Played Score
      pdf.text(`Last Played Quiz: ${lastPlayedQuiz}`, 20, startY);
      startY += 5; // Add space between quiz and score
      pdf.text(`Last Played Score: ${lastPlayedScore}`, 20, startY);

      startY += 15; // Space after each user's section

      // Add a separator line for clarity
      pdf.setDrawColor(0); // Set line color
      pdf.line(20, startY - 10, 190, startY - 10); // Draw line across the page
    });

    // Add disclaimer
    pdf.setFontSize(10);
    pdf.text(
      "This is a Computer Generated Report and does not require any Signature.",
      20,
      startY + 5
    );
    pdf.setFont("helvetica", "bold"); // Set the font to Helvetica Bold for headings

    pdf.text("All Rights Reserved by Virtual Question Bank", 70, startY + 15);
    pdf.setFont("helvetica", "normal"); // Reset to normal font for details

    // Save the generated PDF
    pdf.save("All-user-stats-report.pdf");
  };

  const handleChatNow = () => {
    if (email) {
      router.push(`/Dashboard/Chat/${email}`); // Navigate to the chat page with the entered email
    } else {
      // Handle empty email case (optional)
      alert("Please enter an email address");
    }
  };

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

          <div className="text-text flex flex-col min-h-[70dvh]">
            {current == "dashboard" && (
              <div className="min-h-[40dvh] px-10 sm:px-7">
                <div>
                  <div className="flex justify-end my-2">
                    <button
                      className="bg-midnight text-silver px-3 font-medium py-2 rounded-xl "
                      onClick={generatePdf}>
                      Generate All Users Report
                    </button>
                  </div>
                </div>
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
                          {apiAllUser.length}
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

            {current === "all-user" && (
              <div className="overflow-x-auto mb-5">
                <div>
                  <div className="flex justify-end mb-5 mx-10">
                    <button
                      className="bg-midnight text-silver px-3 font-medium py-2 rounded-xl "
                      onClick={showModal}>
                      Add New User
                    </button>
                  </div>
                </div>

                {apiAllUser ? (
                  <ul className="list-none p-0">
                    {apiAllUser.map(
                      ({ name, email, role, performance }, index) => (
                        <div
                          key={email}
                          className={`rounded py-5 justify-around px-4 gap-x-2 overflow-hidden ${
                            index % 2 === 0
                              ? "bg-bubble-gum/30 hover:bg-bubble-gum/40"
                              : "bg-lightGreen/30 hover:bg-green/40"
                          } hover:cursor-pointer transition duration-200 mx-10 my-2`}>
                          <div className="flex justify-between">
                            <p className="px-2 font-bold">
                              {index + 1} : User Detail
                            </p>
                            <div className="flex justify-end flex-grow">
                              <Tooltip title="Delete User">
                                <span className="hover:font-semibold">
                                  <MdOutlineDeleteForever
                                    onClick={() => showDeleteConfirm(email)} // Pass email as a callback
                                    className="text-red text-2xl"
                                  />
                                </span>
                              </Tooltip>
                            </div>
                          </div>
                          <div className="flex  items-center   px-4">
                            <div className="flex flex-wrap  gap-x-5 py-2">
                              <p className="w-24 sm:w-8 sm:text-sm">
                                Role: <strong>{role}</strong>
                              </p>
                              <p className="w-64 sm:w-20 sm:text-sm">
                                Name: <strong>{name}</strong>
                              </p>
                              <p className="w-72 sm:w-28 sm:text-sm ">
                                Email: <strong>{email}</strong>
                              </p>
                            </div>
                          </div>

                          <p className="px-2 font-bold">User Performance</p>
                          <div className="flex justify-between">
                            <p className="px-4 py-2">
                              Total Played:{" "}
                              {performance[0]?.totalPlayed || "N/A"}
                            </p>
                            <p className="px-4 py-2">
                              Total Win:{" "}
                              <strong className="text-midnight">
                                {performance[0]?.Win || "N/A"}
                              </strong>
                            </p>
                            <p className="px-4 py-2">
                              Total Loss:{" "}
                              <strong className="text-red">
                                {performance[0]?.loss || "N/A"}
                              </strong>
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </ul>
                ) : (
                  <Skeleton />
                )}

                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null} // This hides the default buttons
                >
                  <AddUser />
                </Modal>
              </div>
            )}

            {current === "chat" && (
              <div className="overflow-x-auto mb-5">
                <div>
                  <div className="flex justify-end mb-5 mx-10">
                    <button
                      className="bg-midnight text-silver px-3 font-medium py-2 rounded-lg "
                      onClick={showModal}>
                      New Message
                    </button>
                  </div>
                </div>
                <p className="px-8 text-xl font-semibold">Recent Chats</p>
                {Messages ? (
                  <ul className="list-none p-0">
                    {Messages.filter(
                      ({ userEmail }) =>
                        userEmail !== "ahmedmughal3182@gmail.com"
                    ).map(({ userEmail }, index) => (
                      <div
                        key={userEmail}
                        className={`rounded py-5 justify-around px-4 gap-x-2 overflow-hidden shadow-sm outline outline-1 outline-text/10
                     hover:cursor-pointer hover:bg-text/5 transition duration-200 mx-10 my-2`}>
                        <div className="flex justify-between">
                          <p className="px-2 font-bold">
                            {index + 1} : {userEmail}
                          </p>
                          <div className="flex justify-end flex-grow">
                            <Tooltip title="Open Chat">
                              <span className="hover:font-semibold">
                                <IoMdArrowForward
                                  onClick={() =>
                                    router.push(`/Dashboard/Chat/${userEmail}`)
                                  } // Pass email as a callback
                                  className="text-2xl"
                                />
                              </span>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <Skeleton />
                )}

                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null} // This hides the default buttons
                >
                  <div className="py-5 flex flex-col gap-2">
                    <h3>Enter Email to Chat with : </h3>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                    <button
                      className="bg-text text-white rounded px-3 py-2"
                      onClick={handleChatNow}>
                      Chat Now
                    </button>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Dashboard;
