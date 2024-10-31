"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Modal, Form, Input, Select, Tooltip } from "antd";
import useAuth from "@/app/hooks/useAuth";
import Loading from "../../loading";
import axios from "axios";
import { message } from "antd";
const AddQuestion = () => {
  const router = useRouter();

  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();

  const [Login, setLogin] = useState(false);

  const [form] = Form.useForm();
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataloaded, setdataloaded] = useState(false);
  const [createdBy, setcreatedBy] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [DemoSubjects, setDemoSubjects] = useState([]);

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

  const correctOption = (value) => {
    const notes = {
      option1: "Option 1",
      option2: "Option 2",
      option3: "Option 3",
      option4: "Option 4",
    };
    form.setFieldsValue({
      note: notes[value] || "",
    });
  };

  const onFinish = (values) => {
    console.log("Form values:", values);

    const existingQuestions =
      JSON.parse(localStorage.getItem("question")) || [];
    existingQuestions.push(values);
    localStorage.setItem("question", JSON.stringify(existingQuestions));
    setQuestionsData(existingQuestions); // Update state with new data
    handleOk();
  };

  useEffect(() => {
    const loadSubject = async () => {
      const response = await axios.get(`/api/v1/Subject`);
      setDemoSubjects(response.data.subjects);
      setdataloaded(true);
    };
    const checkLogin = localStorage.getItem("Login");
    checkLogin ? setLogin(true) : setLogin(false);
    loadSubject();
    const Adminname = localStorage.getItem("role");
    setcreatedBy(Adminname);
  }, []);

  const handleDelete = (index) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Question?",
      content: "This action cannot be undone.",
      onOk: () => {
        const updatedQuestions = questionsData.filter((_, i) => i !== index);
        setQuestionsData(updatedQuestions);
        localStorage.setItem("question", JSON.stringify(updatedQuestions));
        messageApi.info("Question Deleted Succesfully.", 10000);
      },
    });
  };

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [Diffuculty, setDiffuculty] = useState("");
  const [Tags, setTags] = useState([]);

  const handleTagsChange = (e) => {
    const inputValue = e.target.value;
    const tagsArray = inputValue.split(",").map((tag) => tag.trim());
    setTags(tagsArray);
  };
  const save = async (e) => {
    e.preventDefault();

    // Create the new quiz data
    const quizData = {
      title: title,
      desc: shortDescription,
      subject: subject,
      imgUrl: imgURL,
      createdBy: createdBy,
      difficulty: Diffuculty,
      questions: questionsData,
      tags: Tags,
    };

    // Check if there are any questions before proceeding
    // if (questionsData.length >= 1) {
    try {
      await axios.post("/api/v1/Quiz", quizData);
      messageApi.success("Question Added Successfully.", 10000);
      localStorage.removeItem("question");

      router.push("/Dashboard");
    } catch (error) {
      console.error("Error posting quiz:", error);
    }
    // } else {
    //   messageApi.warning("Please add minimium 1 questions.", 10000);
    // }
  };

  return (
    <>
      {contextHolder}

      <div>
        {dataloaded && (
          <>
            <div className="text-text flex flex-col">
              <div className="flex items-center px-10 py-5 justify-between">
                <p
                  className="bg-darkBlue rounded flex items-center justify-start text-white px-4 py-2 cursor-pointer"
                  onClick={() => router.push("/Dashboard")}>
                  <FaAngleLeft />
                  Back
                </p>
              </div>

              <div className="px-10 text-text text-xl">
                <form
                  action="submit"
                  onSubmit={save}
                  className="bg-silver flex flex-col flex-wrap py-5 gap-y-2 outline outline-1 outline-text/20 rounded-lg p-5 mb-5">
                  <p className="text-4xl text-center font-semibold">Add Quiz</p>

                  <label htmlFor="title" className="text-lg">
                    Topic / Title :
                  </label>
                  <div className="flex items-center ps-2 rounded-md bg-white">
                    <input
                      type="text"
                      required
                      name="title"
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      maxLength={120}
                      className="p-2 rounded-sm w-full me-2"
                      placeholder="Quiz Topic/Title"
                    />
                  </div>

                  <label htmlFor="shortDescription" className="text-lg">
                    Short Description :
                  </label>
                  <div className="flex items-center ps-2 rounded-md bg-white">
                    <input
                      type="text"
                      required
                      value={shortDescription}
                      onChange={(e) => {
                        setShortDescription(e.target.value);
                      }}
                      name="shortDescription"
                      id="shortDescription"
                      maxLength={250}
                      className="p-2 rounded-sm w-full me-2"
                      placeholder="Short description about the quiz."
                    />
                  </div>

                  <label htmlFor="subject" className="text-lg">
                    Subject :
                  </label>
                  {dataloaded && DemoSubjects.length > 0 && (
                    <select
                      id="subject"
                      name="subject"
                      className="p-2"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}>
                      <option value="" disabled>
                        Select Subject
                      </option>

                      {DemoSubjects.map((subjectItem, index) => (
                        <option key={index} value={subjectItem.title}>
                          {subjectItem.title}
                        </option>
                      ))}
                    </select>
                  )}
                  <label htmlFor="diffuculty" className="text-lg">
                    Diffuculty :
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    className="p-2"
                    required
                    value={Diffuculty}
                    onChange={(e) => setDiffuculty(e.target.value)}>
                    <option value="" disabled>
                      Select Diffuculty
                    </option>

                    <option key="easy" value="Easy">
                      Easy
                    </option>
                    <option key="medium" value="Medium">
                      Medium
                    </option>
                    <option key="hard" value="Hard">
                      Hard
                    </option>
                  </select>
                  <label htmlFor="imgURL" className="text-lg">
                    Image URL :
                  </label>
                  <div className="flex items-center ps-2 rounded-md bg-white">
                    <input
                      type="text"
                      value={imgURL}
                      onChange={(e) => {
                        setImgURL(e.target.value);
                      }}
                      name="imgURL"
                      id="imgURL"
                      className="p-2 rounded-sm w-full me-2"
                      placeholder="URL of Image. (Optional)"
                    />
                  </div>
                  <label htmlFor="tags" className="text-lg">
                    Tags :
                  </label>
                  <div className="flex items-center ps-2 rounded-md bg-white">
                    <textarea
                      value={Tags.join(",")}
                      onChange={handleTagsChange}
                      name="tags"
                      id="tags"
                      className="p-2 rounded-sm w-full me-2"
                      placeholder="Separate Tags by , (Comma)."
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="float-start bg-text text-base text-white px-4 py-2 rounded-md my-4"
                      onClick={showModal}>
                      Add Question
                    </button>
                  </div>

                  <div className="flex flex-col  justify-around">
                    {questionsData.length > 0 ? (
                      questionsData.map(({ questionTitle }, index) => (
                        <div
                          key={index}
                          className="bg-white rounded flex py-2 px-4 my-2 justify-between cursor-pointer items-center">
                          <span className="flex">
                            <p>
                              {index + 1} <span className="me-1">:</span>
                            </p>{" "}
                            <p
                              key={index}
                              className="line-clamp-1 font-semibold">
                              {" "}
                              {questionTitle}
                            </p>
                          </span>
                          <Tooltip title="Delete">
                            <MdOutlineDeleteForever
                              className="text-red  text-2xl hover:font-semibold transition ease-in"
                              onClick={() => handleDelete(index)}
                            />
                          </Tooltip>
                        </div>
                      ))
                    ) : (
                      <p className="px-5">No Question Added yet</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-2 w-32 bg-green hover:bg-darkGreen transition ease-in mx-10 my-4 text-text rounded-md">
                    Save Quiz
                  </button>
                </form>
              </div>
            </div>
            <Modal
              title="Add Question"
              open={isModalOpen}
              onOk={() => form.submit()} // Trigger form submission on OK
              onCancel={handleCancel}>
              <Form
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                className="flex flex-col gap-y-2 mt-5">
                <Form.Item
                  name="questionTitle"
                  label="Question Title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the question title",
                    },
                  ]}>
                  <TextArea rows={3} placeholder="Enter Question Title Here." />
                </Form.Item>
                <Form.Item
                  name="option1"
                  label="Option 1"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the 1st option",
                    },
                  ]}>
                  <Input placeholder="Enter 1st Option" />
                </Form.Item>
                <Form.Item
                  name="option2"
                  label="Option 2"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the 2nd option",
                    },
                  ]}>
                  <Input placeholder="Enter 2nd Option" />
                </Form.Item>
                <Form.Item
                  name="option3"
                  label="Option 3"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the 3rd option",
                    },
                  ]}>
                  <Input placeholder="Enter 3rd Option" />
                </Form.Item>
                <Form.Item
                  name="option4"
                  label="Option 4"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the 4th option",
                    },
                  ]}>
                  <Input placeholder="Enter 4th Option" />
                </Form.Item>
                <Form.Item
                  name="correctOption"
                  label="Correct Option"
                  rules={[
                    {
                      required: true,
                      message: "Please select the correct option",
                    },
                  ]}>
                  <Select
                    placeholder="Select a Correct option"
                    onChange={correctOption}
                    allowClear>
                    <Option value="option1">Option 1</Option>
                    <Option value="option2">Option 2</Option>
                    <Option value="option3">Option 3</Option>
                    <Option value="option4">Option 4</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AddQuestion;
