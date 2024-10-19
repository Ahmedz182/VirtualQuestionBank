"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";
import { message } from "antd";

const Admin = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const Adminlogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/api/v1/Auth/GetAdmin", loginData); // Use POST and send data in body

      if (response.status === 200) {
        localStorage.setItem("Login", true);
        localStorage.setItem(
          "adminDetail",
          JSON.stringify(response.data.AdminDetail)
        );
        localStorage.setItem("token", JSON.stringify(response.data.token));
        messageApi.success("Admin Login Successful");
        setTimeout(() => {
          router.push("/Dashboard");
        }, 3000);
      } else {
        messageApi.warning(
          "Login Unsuccessful. Check your email and password."
        );
      }
    } catch (error) {
      console.error("Error While Login:", error);
      messageApi.warning(
        "An error occurred while trying to log in. Please try again."
      );
    }

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("Login");

    if (isLogin) {
      router.push("/Dashboard");
    }

    return () => {};
  });

  return (
    <>
      {contextHolder}

      <div className="my-10 mx-10 customBg text-text min-h-[90dvh] flex flex-col">
        <p className="text-3xl font-medium tracking-wide text-text/80 text-center">
          Welcome Back, Admin! Continue Managing Your Platform.
        </p>
        <div className="flex items-start justify-center">
          <div className="flex  flex-col mt-10 bg-[#f2f4f7] w-[45dvw]  sm:w-[85dvw] md:w-[90dvw]  p-6 rounded-lg drop-shadow-lg  ">
            <p className="tracking-wider font-semibold uppercase text-3xl text-center my-5">
              Admin Login
            </p>

            <form
              className="flex flex-col justify-start gap-y-2"
              onSubmit={Adminlogin}>
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
              <label htmlFor="password" className="text-lg">
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
              <div className="flex items-center justify-between mx-1 mt-3">
                <span className="flex items-center">
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
                className="bg-darkBlue py-2 px-10 text-white rounded-md">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
