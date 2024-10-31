"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Chat = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const currentUserEmail = JSON.parse(
      localStorage.getItem("userDetail")
    )?.email;

    setEmail(currentUserEmail);
  }, []);

  return (
    <>
      <div
        className="min-h-[80dvh] flex flex-col text-white gap-5 items-center justify-center 
      bg-cover  
      "
        style={{
          backgroundImage:
            "url('https://4kwallpapers.com/images/wallpapers/gradient-background-6016x3384-11027.jpg')",
        }}>
        <p className="text-center strokeText py-5 text-5xl font-black tracking-wide">
          Support Center
        </p>
        <p className="tracking-wide strokeText">Lets have a chat with Us</p>
        <Link href={`/Chat/${email}`}>
          <button className="p-2 px-5 my-3 strokeText outline-1 outline-white outline rounded-tr-2xl rounded-bl-2xl hover:rounded-tl-2xl hover:rounded-br-2xl transition ease-in  hover:bg-white ">
            Chat Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default Chat;
