"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Modal, Form, Input, Select, Tooltip, message } from "antd";
import useAuth from "@/app/hooks/useAuth";
import Loading from "@/app/loading";
import axios from "axios";
import { useParams } from "next/navigation";

const UpdateQuestion = () => {
  const params = useParams();
  const router = useRouter();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataloaded, setDataloaded] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [DemoSubjects, setDemoSubjects] = useState([]);
  const [Quiz, setQuiz] = useState({});
  const [Login, setLogin] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log("Form values:", values);
    const existingQuestions =
      JSON.parse(localStorage.getItem("question")) || [];
    existingQuestions.push(values);
    localStorage.setItem("question", JSON.stringify(existingQuestions));
    setQuestionsData(existingQuestions);
    handleOk();
  };

  useEffect(() => {
    const loadSubject = async () => {
      const response = await axios.get(`/api/v1/Subject`);
      setDemoSubjects(response.data.subjects);
      setDataloaded(true);
    };

    const loadQuiz = async () => {
      const response = await axios.get(`/api/v1/Quiz?id=${params.id}`);
      if (response.data.quiz) {
        setQuiz(response.data.quiz);
        form.setFieldsValue(response.data.quiz); // Set form values
      }
    };

    const checkLogin = localStorage.getItem("Login");
    setLogin(!!checkLogin);

    loadSubject();
    loadQuiz();
  }, [params.id]);

  const save = async (e) => {
    const quizData = {
      ...form.getFieldsValue(),
      questions: questionsData,
    };

    try {
      await axios.put(`/api/v1/Quiz/?id=${params.id}`, quizData); // Use PUT request to update the quiz
      message.success("Quiz Updated Successfully.");
      localStorage.removeItem("question");
      router.push("/Dashboard");
    } catch (error) {
      console.error("Error updating quiz:", error);
      message.error("Error updating quiz.");
    }
  };

  return (
    <div>
      {dataloaded && (
        <div className="flex flex-col">
          <div className="flex items-center px-10 py-5 justify-between">
            <p
              className="bg-darkBlue rounded flex items-center justify-start text-white px-4 py-2 cursor-pointer"
              onClick={() => router.push("/Dashboard")}>
              <FaAngleLeft />
              Back
            </p>
          </div>

          <div className="px-10 text-text text-xl">
            <Form
              form={form}
              layout="vertical"
              onFinish={save}
              className="bg-silver rounded-lg p-5 mb-5">
              <p className="text-4xl text-center font-semibold">Edit Quiz</p>

              <Form.Item
                label="Topic / Title :"
                name="title"
                rules={[
                  { required: true, message: "Please input the title!" },
                ]}>
                <Input placeholder="Quiz Topic/Title" maxLength={120} />
              </Form.Item>

              <Form.Item
                label="Short Description :"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: "Please input the description!",
                  },
                ]}>
                <Input
                  placeholder="Short description about the quiz."
                  maxLength={250}
                />
              </Form.Item>

              <Form.Item
                label="Subject :"
                name="subject"
                rules={[
                  { required: true, message: "Please select a subject!" },
                ]}>
                <Select placeholder="Select Subject">
                  {DemoSubjects.map((subjectItem, index) => (
                    <Option key={index} value={subjectItem.title}>
                      {subjectItem.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Difficulty :"
                name="difficulty"
                rules={[
                  {
                    required: true,
                    message: "Please select the difficulty!",
                  },
                ]}>
                <Select placeholder="Select Difficulty">
                  <Option value="Easy">Easy</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Hard">Hard</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Image URL :" name="imgUrl">
                <Input placeholder="Image URL of the quiz." />
              </Form.Item>

              <Form.Item label="Tags :" name="tags">
                <Input placeholder="Add tags separated by commas" />
              </Form.Item>

              <button
                type="submit"
                className="bg-darkBlue text-white rounded-md p-2 hover:bg-darkBlue/90 transition-all duration-300">
                Update Quiz
              </button>
            </Form>

            {/* <div className="flex flex-col">
              <p className="text-2xl text-center font-semibold">
                Quiz Questions
              </p>
              <div className="flex flex-col gap-2">
                {questionsData.length > 0 ? (
                  questionsData.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white border border-text/20 rounded-lg flex flex-col p-4">
                      <p className="text-lg font-bold">
                        Question: {question.question}
                      </p>
                      <p className="text-sm">Options:</p>
                      <ul className="list-disc list-inside">
                        {Object.keys(question)
                          .filter((key) => key.startsWith("option"))
                          .map((optionKey) => (
                            <li key={optionKey}>{question[optionKey]}</li>
                          ))}
                      </ul>
                      <div className="flex justify-between mt-2">
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-600 text-white rounded-md p-1">
                          <MdOutlineDeleteForever />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No questions added yet.</p>
                )}
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateQuestion;
