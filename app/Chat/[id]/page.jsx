"use client";
import React, { useEffect, useState, useRef } from "react";
import CustomerCare from "@/public/images/care.png";
import userCare from "@/public/images/userCare.png";
import { FiSend } from "react-icons/fi";
import { Tooltip } from "antd";
import { useParams } from "next/navigation";
import Image from "next/image";
import Pusher from "pusher-js";
import axios from "axios";
import { useRouter } from "next/navigation";

const ChatUi = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [login, setLogin] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = localStorage.getItem("UserLogin");
    if (!checkLogin) {
      setLogin(false);
      alert("Please Login first to chat ");
      router.push("/auth/login");
    } else {
      setLogin(true);
    }
  }, [router]);

  // Initialize Pusher
  useEffect(() => {
    const pusher = new Pusher("a788034843d7dc2bf49e", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("my-channel");

    const handleIncomingMessage = (data) => {
      console.log("Incoming message:", data);

      const currentUserEmail = JSON.parse(
        localStorage.getItem("userDetail")
      )?.email;

      // Display only messages intended for the current user
      if (data.receiver === currentUserEmail) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: data.sender,
            message: data.message,
            time: new Date().toLocaleString(),
          },
        ]);
      } else {
        console.log("Message not intended for the current user");
      }
    };

    channel.bind("my-event", handleIncomingMessage);

    return () => {
      channel.unbind("my-event", handleIncomingMessage);
      channel.unsubscribe("my-channel");
    };
  }, []);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage) return;

    const sender = JSON.parse(localStorage.getItem("userDetail"))?.email;
    const isAdmin = sender === "ahmedmughal3182@gmail.com";
    const receiver = "ahmedmughal3182@gmail.com"; // Admin can send to any user; users send only to admin

    try {
      const response = await axios.post("/api/v1/Pusher", {
        message: newMessage,
        sender,
        receiver,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender, message: newMessage, time: new Date().toLocaleString() },
      ]);

      setNewMessage("");
      console.log(response);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const formattedDate = new Date().toLocaleDateString();

  return (
    <>
      {login && (
        <>
          <div className="  p-10 flex items-center justify-center sm:items-start">
            <div className="bg-white h-screen sm:h-[60dvh] w-[90dvw] border border-text rounded flex flex-col resize">
              <div className="flex p-3 flex-col">
                <div className="flex justify-between px-3">
                  <p className="font-bold text-left">Live Chat</p>
                  <p>{formattedDate}</p>
                </div>
                <hr className="w-full border-t border-text mt-2" />
              </div>

              <div className="overflow-y-scroll p-3 px-5 flex flex-col gap-y-3 h-[80dvh] sm:h-[60dvh]">
                {messages.map(({ sender, message, time }, index) => (
                  <React.Fragment key={index}>
                    {sender === "ahmedmughal3182@gmail.com" ? (
                      <span className="flex gap-x-1 justify-end">
                        <Image
                          src={CustomerCare}
                          width={40}
                          height={40}
                          className="object-contain p-1 imgAvtor bg-silver/40"
                          alt="Receiver Avatar"
                          loading="lazy"
                        />
                        <div className="outline-dashed bg-lightGreen/40 text-black outline-text outline-1 rounded justify-end p-2 w-96">
                          <span className="text-xs flex justify-between">
                            <p>Admin</p> {/* Display sender's email */}
                            <p>{time}</p>
                          </span>
                          <p>{message}</p>
                        </div>
                      </span>
                    ) : (
                      <span className="flex gap-x-1 justify-between">
                        <div className="outline-dashed outline-text bg-text/40 text-white outline-1 flex flex-col rounded p-2 w-96">
                          <span className="text-xs flex justify-between">
                            <p>Admin</p> {/* Display sender's email */}
                            <p>{time}</p>
                          </span>
                          <p>{message}</p>
                        </div>
                        <Image
                          src={userCare}
                          width={30}
                          height={30}
                          className="object-contain imgAvtor bg-silver/40"
                          alt="Customer Avatar"
                          loading="lazy"
                        />
                      </span>
                    )}
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
              </div>

              <div className="w-full flex items-center  justify-center gap-x-3 pt-5 mb-2 px-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  cols={48}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  className="outline-none p-2"
                  placeholder="Enter your message here..."
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
        </>
      )}
    </>
  );
};

export default ChatUi;
