"use client";
import React, { useEffect, useState, useRef } from "react";
import CustomerCare from "@/public/images/care.png";
import userCare from "@/public/images/userCare.png";
import { FiSend } from "react-icons/fi";
import { Tooltip } from "antd";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Pusher from "pusher-js";
import axios from "axios";

const ChatUi = () => {
  const { id } = useParams(); // Get chat ID from URL params
  const [messages, setMessages] = useState([]); // Store chat messages
  const [login, setLogin] = useState(false); // User login status
  const [newMessage, setNewMessage] = useState(""); // New message input
  const messagesEndRef = useRef(null); // Reference for scrolling to bottom
  const router = useRouter(); // Router instance for navigation

  // Check if user is logged in
  useEffect(() => {
    const checkLogin = localStorage.getItem("UserLogin");
    if (!checkLogin) {
      alert("Please Login first to chat");
      router.push("/auth/login");
    } else {
      setLogin(true);
    }
  }, [router]);

  // Fetch messages for the logged-in user
  useEffect(() => {
    const fetchMessages = async () => {
      const userDetail = JSON.parse(localStorage.getItem("userDetail"));
      const userEmail = userDetail?.email;

      if (!userEmail) {
        console.error("User email is required to fetch messages.");
        return;
      }

      try {
        const response = await axios.get("/api/v1/messages", {
          params: { email: userEmail },
        });
        setMessages(response.data?.messages || []);
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchMessages();
  }, []);

  // Initialize Pusher for real-time messaging
  useEffect(() => {
    const pusher = new Pusher("a788034843d7dc2bf49e", { cluster: "ap2" });
    const channel = pusher.subscribe("my-channel");

    const handleIncomingMessage = (data) => {
      const currentUserEmail = JSON.parse(
        localStorage.getItem("userDetail")
      )?.email;

      if (data.receiver === currentUserEmail) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: data.sender,
            message: data.message,
            time: data.time || new Date().toLocaleString(),
          },
        ]);
      }
    };

    channel.bind("my-event", handleIncomingMessage);

    return () => {
      channel.unbind("my-event", handleIncomingMessage);
      channel.unsubscribe("my-channel");
    };
  }, []);

  // Scroll to the bottom of the messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage) return;

    const userDetail = JSON.parse(localStorage.getItem("userDetail"));
    const sender = userDetail?.email;
    const receiver = "ahmedmughal3182@gmail.com"; // Replace with dynamic receiver if needed

    try {
      await axios.post("/api/v1/Pusher", {
        userEmail: sender,
        message: newMessage,
        sender,
        receiver,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender, message: newMessage, time: new Date().toISOString() },
      ]);

      setNewMessage(""); // Clear the input field
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Format timestamp for message display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  const formattedDate = new Date().toLocaleDateString();

  return (
    <>
      {login && (
        <div className="p-10 flex items-center justify-center sm:items-start">
          <div className="bg-white h-screen sm:h-[85dvh] w-[90dvw] border rounded flex flex-col">
            <div className="p-4">
              <div className="flex justify-between">
                <p className="font-bold text-lg">Live Chat</p>
                <p>{formattedDate}</p>
              </div>
              <hr className="border-t mt-2" />
            </div>

            <div className="p-4 overflow-y-scroll h-[80vh] sm:h-[60vh] flex flex-col gap-y-4 ">
              {messages.map(({ sender, message, time }, index) => (
                <div
                  key={index}
                  className={`flex ${
                    sender === "ahmedmughal3182@gmail.com"
                      ? "justify-start"
                      : "justify-end"
                  }`}>
                  <div
                    className={`flex ${
                      sender === "ahmedmughal3182@gmail.com"
                        ? "items-start"
                        : "items-end"
                    } gap-2`}>
                    {sender === "ahmedmughal3182@gmail.com" ? (
                      <>
                        <Image
                          src={CustomerCare}
                          width={40}
                          height={40}
                          className="rounded-full bg-gray-200"
                          alt="Admin Avatar"
                        />
                        <div className="bg-text text-white p-3 rounded-lg shadow-md ">
                          <span className="text-xs gap-x-4 flex justify-between">
                            <p>Admin</p>
                            <p>{formatTimestamp(time)}</p>
                          </span>
                          <p className="whitespace-pre-wrap break-words max-w-[75dvw]">
                            {message}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className=" p-3 rounded-lg shadow-md min-w-96  ">
                          <span className="text-xs gap-x-4 flex justify-between">
                            <p>User</p>
                            <p>{formatTimestamp(time)}</p>
                          </span>
                          <p className="break-words max-w-[75dvw]">{message}</p>
                        </div>
                        <Image
                          src={userCare}
                          width={40}
                          height={40}
                          className="rounded-full bg-gray-200"
                          alt="User Avatar"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 h-24 flex items-center gap-x-2 border-t">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={1}
                className="w-full p-2 border rounded focus:outline-none"
                placeholder="Enter your message here..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Tooltip title="Send">
                <FiSend
                  className="text-2xl cursor-pointer"
                  onClick={handleSendMessage}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatUi;
