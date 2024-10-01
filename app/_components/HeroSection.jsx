import Link from "next/link";
import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <>
      <div className="  w-full  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex md:flex-col sm:flex-col h-[90dvh] lg:h-[90dvh] bg-silver justify-around   ps-8 md:ps-4 sm:ps-0 pt-5 sm:py-5 md:py-10 overflow-hidden">
        <div className="flex flex-col  items-center justify-center gap-y-3 sm:w-full sm:py-10 sm:pb-5 sm:items-start ">
          <span className="flex flex-col gap-y-5 sm:px-3  md:gap-y-3 sm:gap-y-3">
            <p className="text-5xl sm:text-3xl md:text-2xl font-black text-text tracking-wide uppercase">
              Unlock Your
              <span className="text-darkGreen font-black"> Potential</span>
            </p>
            <p className="text-5xl sm:text-3xl md:text-2xl uppercase font-lighht text-text tracking-wide">
              With<span className="text-darkGreen font-bold"> Every </span>
              Question!
            </p>
            <p className="text-text/80  font-normal ps-2 sm:ps-1 tracking-widest  text-xl sm:text-sm md:text-sm">
              Engage Educate & Elevate your mind.
            </p>
            <span className="flex flex-col gap-8 sm:gap-4 md:gap-6">
              <div className="flex sm:mt-5">
                <div className="flex h-12 md:h-10 sm:h-10 w-[40dvw] md:w-[58dvw] sm:w-[90dvw]   shadow-inner outline outline-1 outline-text/20 bg-white rounded-lg ps-4 sm:ps-3 md:ps-3 ">
                  <input
                    className="w-[40dvw] md:w-[58dvw] sm:w-[90dvw] bg-white   h-12 sm:h-10 md:h-10  outline-none md:text-sm sm:text-sm sm:ps-3 md:ps-1 ps-1 pe-2 sm:pe-0"
                    type="search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search Here (i.e Subject, Question)"
                    name="search"
                    id="search"
                  />
                  <span
                    onClick={() => {
                      router.push(`/Quiz/search/${search}`);
                    }}
                    className="bg-darkGreen cursor-pointer h-12 md:h-10 sm:h-10 w-16 p-3 flex items-center  justify-center rounded-br-lg rounded-tr-lg">
                    <LuSearch className="text-white text-2xl md-text-xl sm:text-base" />
                  </span>
                </div>
              </div>
              <span className="flex">
                <Link href="/Quiz">
                  <button className=" ms-2 w-40 sm:w-36 md:w-28 outline outline-1  sm:mt-2  px-4 md:px-1 sm:px-2   py-3 text-sm md:text-xs sm:text-xs  font-semibold text-text rounded-full hover:scale-95 bg-white   ease-linear transition">
                    Unlock Potential
                  </button>
                </Link>
                <Link href={"/auth/create-account"}>
                  <button className="ms-2 w-40 sm:w-36 md:w-28 sm:mt-2 px-4 md:px-1 sm:px-2   py-3 text-sm md:text-xs sm:text-xs  font-semibold text-white rounded-full hover:scale-95 bg-darkGreen   ease-linear transition">
                    Register Now
                  </button>
                </Link>
              </span>
            </span>
          </span>
        </div>
        <div className="flex items-center justify-center ">
          <iframe
            className="h-[30rem] w-[45dvw] md:h-[15rem] md:w-[90dvw] sm:h-[40rem] sm:w-[85dvw] "
            src="https://lottie.host/embed/dc7acbd4-2443-4282-a8ea-1441298fb727/uyfTtdsbye.json"></iframe>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
