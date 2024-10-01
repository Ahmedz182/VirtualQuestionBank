import React from "react";
import Image from "next/image";
import challangepic from "../assets/images/challange.webp";
import Link from "next/link";
const Challange = () => {
  return (
    <>
      <div className="bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex sm:flex-col py-10 md:py-8 sm:py-4 bg-lightGreen m-10 rounded-3xl justify-center items-center text-text">
        <div className="px-10 py-10 flex flex-col tracking-wider items-start gap-5 justify-center w-[60dvw] md:w-full sm:w-full">
          <span className="text-5xl md:text-3xl sm:text-2xl font-bold leading-snug">
            Take a break this weekend and challenge your mind with our quizzes!
          </span>
          <span className="text-2xl tracking-wider">
            Knowledge is Power, Quiz to Empower.
          </span>
          <Link href="/Quiz">
            <button className="bg-text p-3 text-white rounded-md transition duration-300 ease-out group relative">
              Challenge Now
              <span className="absolute inset-0 border-2 rounded-md border-transparent group-hover:border-text/80 group-hover:-inset-1 transition-all duration-300 ease-out pointer-events-none"></span>
            </button>
          </Link>
        </div>

        <div className="ms-[-70px] sm:ms-0">
          <Image src={challangepic} alt="img" />
        </div>
      </div>
    </>
  );
};

export default Challange;
