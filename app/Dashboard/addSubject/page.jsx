"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import useAuth from "@/app/hooks/useAuth";
import Loading from "../../loading";
import axios from "axios";
import { message } from "antd";

const AddQuestion = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imgURL, setImgURL] = useState("");

  const save = async (e) => {
    e.preventDefault();

    // Create the new quiz data
    const subject = {
      title: title,
      desc: shortDescription,
      imgUrl: imgURL,
    };

    try {
      const response = await axios.post("/api/v1/Subject", subject);
      if (response.status === 201) {
        messageApi.success("Subject Added Successfully.");
        setTimeout(() => {
          router.push("/Dashboard");
        }, 3000);
      } else {
        alert("Error while adding Subject.");
      }
    } catch (error) {
      console.error("Error posting Subject:", error);
    }
  };

  return (
    <>
      {contextHolder}
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
            <p className="text-4xl text-center font-semibold">Add Subject</p>

            <label htmlFor="title" className="text-lg">
              Subject Title :
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
                placeholder="Subject Title"
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
                placeholder="Short description about the Subject."
              />
            </div>

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
                required
                name="imgURL"
                id="imgURL"
                className="p-2 rounded-sm w-full me-2"
                placeholder="URL of Image"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-4 w-fit   bg-green hover:bg-darkGreen transition ease-in mx-10 my-4 text-text rounded-md">
              Save Subject
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuestion;
