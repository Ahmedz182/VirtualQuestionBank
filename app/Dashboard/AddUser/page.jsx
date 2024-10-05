"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { message } from "antd";

const AddUser = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [Name, setName] = useState("");
  const [Gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const createAccount = async (e) => {
    e.preventDefault();
    const accountData = {
      name: Name,
      email: email.toLowerCase(),
      password: password,
      gender: Gender,
    };

    try {
      await axios.post("/api/v1/Auth/CreateUser", accountData);
      messageApi.success("User Added Successful");
    
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      messageApi.warning("Error Creating Account Please try again.");
    }
  };

  return (
    <>
      {contextHolder}
      <div className=" mx-10 customBg text-text ">
        <div className="flex items-start justify-center">
          <div className="flex  flex-col p-6  bg-[#f2f4f7] w-[45dvw]  sm:w-[85dvw] md:w-[90dvw]   rounded-lg drop-shadow-lg  ">
            <p className="text-3xl text-center my-5 tracking-wider font-semibold uppercase ">
              Add User
            </p>

            <form
              className="flex flex-col justify-start gap-y-2 "
              onSubmit={createAccount}>
              <label htmlFor="name" className="text-lg">
                Full Name:
              </label>
              <div className="flex items-center ps-2 rounded-md bg-white">
                <FaUser className="text-text text-2xl me-2 " />
                <input
                  required
                  type="Text"
                  name="name"
                  value={Name}
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="p-2 rounded-sm w-full me-2"
                  placeholder="i.e Muhammad Ahmed Fayyaz"
                />
              </div>
              <label htmlFor="email" className="text-lg">
                Email Address:
              </label>
              <div className="flex items-center ps-2 rounded-md bg-white">
                <IoMdMail className="text-text text-2xl me-2 " />

                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  className="p-2 rounded-sm w-full me-2"
                  placeholder="user@xyz.com"
                />
              </div>
              <label htmlFor="email" className="text-lg">
                Password:
              </label>
              <div className="flex items-center ps-2 rounded-md bg-white">
                <RiLockPasswordFill className="text-text text-2xl me-2 " />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  id="password"
                  className="p-2 rounded-sm w-full me-2"
                  placeholder="password here"
                />
              </div>
              <label htmlFor="gender" className="text-lg">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                className="p-2"
                required
                onChange={(e) => setGender(e.target.value)}>
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <div className="flex items-center justify-between mx-1 mt-3">
                <span className="flex items-center ">
                  <input
                    type="checkbox"
                    name="showPass"
                    onClick={() => setShowPassword(!showPassword)}
                    id="showPass"
                    className="w-4 h-4 me-2 accent-text"
                  />

                  <label htmlFor="showPass" className="text-lg">
                    Show Password
                  </label>
                </span>
              </div>
              <button
                type="submit"
                className="bg-darkBlue py-2 px-6 text-white rounded-md uppercase">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
