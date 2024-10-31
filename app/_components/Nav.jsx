"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
  PieChartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  RiAccountPinCircleLine,
  RiMenu4Fill,
  RiMenu3Fill,
} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo.png";
import { Dropdown, Space } from "antd";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";

const Nav = () => {
  const [Login, setLogin] = useState(false);
  const [AdminLogin, setAdminLogin] = useState(false);
  const [UserDetal, setUserDetal] = useState(null || []);
  const [AdminDetal, setAdminDetal] = useState(null || []);
  const [Subject, setSubject] = useState([]);
  const router = useRouter();

  const categoryItems = Subject.map(({ title }, index) => ({
    label: (
      <span
        className="hover:text-black cursor-pointer"
        onClick={() => router.push(`/Quiz/subject/${title}`)}>
        {title}
      </span>
    ),
    key: index,
  }));

  const Subjectmenu = {
    items: categoryItems,
  };

  const guestMenuItems = [
    {
      key: "1",
      icon: <LoginOutlined />,
      label: (
        <Link href="/auth/login" className="text-sm font-semibold">
          Login
        </Link>
      ),
    },
    {
      key: "2",
      icon: <UserAddOutlined />,
      label: (
        <Link href="/auth/create-account" className="text-sm font-semibold">
          Sign Up
        </Link>
      ),
    },
  ];

  const loggedInMenuItems = [
    {
      key: "0",
      label: (
        <p className="text-sm font-semibold text-text">
          Welcome Back
          <br />
          <strong> {UserDetal.name}</strong>
          <br />
          <span className="text-xs">{UserDetal.email}</span>
        </p>
      ),
    },
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <Link href="/Profile" className="text-sm font-semibold">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      icon: <MessageOutlined />,
      label: (
        <Link href="/Chat" className="text-sm font-semibold">
          Live Chat
        </Link>
      ),
    },
    {
      key: "3",
      danger: true,
      icon: <LogoutOutlined />,
      label: (
        <a
          href="/auth/login"
          className="text-sm font-semibold"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("UserLogin");
            localStorage.removeItem("role");
            localStorage.removeItem("userDetail");
            window.location.href = "/auth/login";
          }}>
          Logout
        </a>
      ),
    },
  ];

  const AdminloggedInMenuItems = [
    {
      key: "1",
      label: (
        <p className="text-sm font-semibold text-text">
          Welcome Back <strong> {AdminDetal.role}!</strong>
          <br />
          <strong> {AdminDetal.name}</strong>
          <br />
          <span className="text-xs">{AdminDetal.email}</span>
        </p>
      ),
    },

    {
      key: "2",
      icon: <PieChartOutlined />,
      label: (
        <Link href="/Dashboard/" className="text-sm font-semibold">
          Dashboard
        </Link>
      ),
    },

    {
      key: "3",
      icon: <LogoutOutlined />,
      danger: true,
      label: (
        <a
          className="text-sm font-semibold"
          onClick={(e) => {
            e.preventDefault();
            Cookies.remove("Login");
            Cookies.remove("role");
            Cookies.remove("token");
            Cookies.remove("adminDetail");
            window.location.href = "/auth/admin";
          }}>
          Logout
        </a>
      ),
    },
  ];
  useEffect(() => {
    const getUserDetails = () => {
      const userDetails = localStorage.getItem("userDetail");
      if (userDetails) {
        try {
          const parsedDetails = JSON.parse(userDetails);
          setUserDetal(parsedDetails);
        } catch (error) {
          console.error("Error parsing user details:", error);
        }
      }
    };

    const getAdminDetails = () => {
      const adminDetails = Cookies.get("adminDetail"); // Retrieve from cookies
      if (adminDetails) {
        try {
          const parsedDetails = JSON.parse(adminDetails);
          setAdminDetal(parsedDetails); // Update state with parsed details
        } catch (error) {
          console.error("Error parsing Admin details:", error);
        }
      }
    };

    const checkLoginStatus = () => {
      const isLogin = localStorage.getItem("UserLogin");
      const isAdminLogin = Cookies.get("Login"); // Retrieve the login status from cookies

      setLogin(!!isLogin);
      setAdminLogin(!!isAdminLogin);
    };

    const getSubject = async () => {
      const response = await axios.get(`/api/v1/Subject`);
      setSubject(response.data.subjects);
    };

    // Initial fetch
    getUserDetails();
    getAdminDetails();
    checkLoginStatus();
    getSubject();

    // Set interval to check for changes
    const intervalId = setInterval(() => {
      getUserDetails();
      getAdminDetails();
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const menu = AdminLogin
    ? AdminloggedInMenuItems
    : Login
    ? loggedInMenuItems
    : guestMenuItems;
  return (
    <div className="px-10 sm:px-5 py-3 flex items-center justify-between">
      <Link href="/">
        <span className="flex items-center">
          <Image width={45} height={45} src={logo} alt="Logo" />
          <p className="text-darkBlue font-bold text-xl md:text-lg sm:text-base tracking-wider cursor-pointer">
            Virtual
            <span className="font-medium text-darkGreen">QuestionBank</span>
          </p>
        </span>
      </Link>
      <ul className="flex text-midnight gap-x-3 font-semibold md:hidden sm:hidden items-center justify-center tracking-wider">
        <Link href="/">
          <li className="cursor-pointer hover:translate-y-[-5px] ease-in transition">
            Home
          </li>
        </Link>
        <li className="relative cursor-pointer group">
          <span className="flex items-center">
            Subjects <span className="w-1"></span>
            <FaAngleDown className="text-text text-sm" />
          </span>
          <span className="absolute sub-menu hidden group-hover:flex bg-white px-5 py-2 top-full left-0 rounded-lg mt-1 shadow-lg">
            <ul className="flex flex-col gap-3">
              {Subject.map(({ title }, index) => (
                <li
                  key={`${index}`}
                  onClick={() => {
                    router.push(`/Quiz/subject/${title}`);
                  }}
                  className="hover:text-black cursor-pointer"
                  style={{ whiteSpace: "nowrap" }}>
                  {title}
                </li>
              ))}
            </ul>
          </span>
        </li>
        <Link href="/Quiz">
          <li className="cursor-pointer hover:translate-y-[-5px] ease-in transition">
            Trendings
          </li>
        </Link>

        <Link href="/about-us">
          <li className="cursor-pointer hover:translate-y-[-5px] ease-in transition">
            About Us
          </li>
        </Link>
        <Link href="/contact-us">
          <li className="cursor-pointer hover:translate-y-[-5px] ease-in transition">
            Contact Us
          </li>
        </Link>
      </ul>

      <div className="flex gap-x-5 sm:gap-4 items-center">
        <Link href="/Quiz">
          <button className="bg-text sm:hidden hover:bg-text sm:px-3 px-4 py-2 text-sm font-semibold text-white rounded-full hover:scale-105 ease-linear transition">
            Practice Now
          </button>
        </Link>
        <span className="flex items-center gap-2">
          <span className="flex gap-3 sm:gap-1">
            <Dropdown menu={{ items: menu }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <RiAccountPinCircleLine className="text-text text-3xl cursor-pointer hover:scale-105 ease-linear transition" />
                </Space>
              </a>
            </Dropdown>
            <RiMenu4Fill className="text-text text-3xl lg:hidden md:block sm:block hidden cursor-pointer hover:scale-105 ease-linear transition" />
          </span>
          <span className="sm:flex md:flex gap-2 sm:gap-1 hidden ">
            <Dropdown menu={Subjectmenu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <RiMenu3Fill className="text-text text-2xl  cursor-pointer hover:scale-105 ease-linear transition" />
                </Space>
              </a>
            </Dropdown>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Nav;
