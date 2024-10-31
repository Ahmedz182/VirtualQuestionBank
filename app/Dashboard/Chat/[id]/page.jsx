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
import Cookies from "js-cookie";

const AdminChatUi = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [messages, setMessages] = useState([]); // Store chat messages
  const [login, setLogin] = useState(false); // Admin login status
  const [decodedEmail, setDecodedEmail] = useState(null); // Decoded email from the URL
  const [newMessage, setNewMessage] = useState(""); // New message input
  const messagesEndRef = useRef(null); // Reference for scrolling to bottom
  const router = useRouter(); // Router instance for navigation

  // Check if admin is logged in
  useEffect(() => {
    const checkLogin = Cookies.get("Login");
    if (!checkLogin) {
      alert("Please Login first to chat");
      router.push("/auth/admin");
    } else {
      setLogin(true);
    }
  }, [router]);

  // Decode the email from the URL
  useEffect(() => {
    const userEmail = decodeURIComponent(id); // Decode the email
    if (userEmail) {
      setDecodedEmail(userEmail); // Set the decoded email
      fetchOldMessages(userEmail); // Fetch messages after email is set
    } else {
      console.error("No email found for this ID.");
    }
  }, [id]);

  // Fetch old messages based on the user's email
  const fetchOldMessages = async (userEmail) => {
    try {
      const response = await axios.get(`/api/v1/messages?email=${userEmail}`); // Fetch messages based on user email
      const allMessages = response.data?.messages || []; // All messages from the server

      // Directly set all messages without filtering
      setMessages(allMessages);
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Initialize Pusher for real-time messaging
  useEffect(() => {
    const pusher = new Pusher("a788034843d7dc2bf49e", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("my-channel");

    const handleIncomingMessage = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: data.sender,
          message: data.message,
          time: new Date().toLocaleString(),
        },
      ]);
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
    if (!newMessage.trim() || !decodedEmail) return; // Ensure we have a message and decoded email

    const sender = "ahmedmughal3182@gmail.com"; // Admin's email
    const receiver = decodedEmail; // Use the email set from incoming message

    try {
      await axios.post("/api/v1/Pusher", {
        message: newMessage,
        sender,
        receiver,
      });

      // Update message state for the admin's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender, message: newMessage, time: new Date().toLocaleString() },
      ]);

      setNewMessage(""); // Clear input field
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
        <div className="p-10 flex items-center justify-center sm:items-start">
          <div className="bg-white h-screen sm:h-[85dvh] w-[90vw] border rounded flex flex-col">
            <div className="p-4">
              <div className="flex justify-between">
                <p className="font-bold text-lg">
                  Admin Live Chat with {decodedEmail}
                </p>
                <p>{formattedDate}</p>
              </div>
              <hr className="border-t mt-2" />
            </div>

            <div className="p-4 overflow-y-auto h-[80vh] sm:h-[60vh] flex flex-col gap-y-4">
              {messages.map(({ sender, message, time }, index) => (
                <div
                  key={index}
                  className={`flex ${
                    sender === "ahmedmughal3182@gmail.com"
                      ? "justify-end"
                      : "justify-start"
                  }`}>
                  {sender === "ahmedmughal3182@gmail.com" ? (
                    <div className="flex items-start gap-2">
                      <div className="bg-text text-white p-3 rounded-lg shadow-md">
                        <span className="text-xs gap-x-4 flex justify-between">
                          <p>Admin</p>
                          <p>{time}</p>
                        </span>
                        <p className="whitespace-pre-wrap break-words max-w-[75dvw]">
                          {message}
                        </p>
                      </div>
                      <Image
                        src={CustomerCare}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="Admin Avatar"
                      />
                    </div>
                  ) : (
                    <div className="flex items-end gap-2">
                      <Image
                        src={userCare}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="User Avatar"
                      />
                      <div className="bg-lightGreen/40 p-3 rounded-lg shadow-md">
                        <span className="text-xs gap-x-4 flex justify-between">
                          <p>{sender}</p>
                          <p>{time}</p>
                        </span>
                        <p className="whitespace-pre-wrap break-words max-w-[75dvw]">
                          {message}
                        </p>
                      </div>
                    </div>
                  )}
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

export default AdminChatUi;
