import React from "react";
import Image from "next/image";
import { LuMonitorPlay } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { TbUserShield } from "react-icons/tb";
import logo from "@/public/images/logo.png";

const QuizCard = ({
  title,
  desc,
  mcq,
  img,
  tag,
  totalPlayed,
  QuizId,
  subject,
  difficulty,
}) => {
  const router = useRouter();

  return (
    <>
      <div className=" bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] group ms-4 sm:ms-0 flex cursor-pointer items-center gap-2  w-[40dvw] sm:w-[95dvw] md:w-[80dvw]  bg-white   gap-y-5  pt-8  pb-5 rounded-xl   border border-1 border-text/10   transition ease-in ">
        <div className="ms-[-30px] flex flex-col justify-between md:hidden sm:hidden min-w-[200px] min-h-[200px]    md:h-[20dvh] ">
          <Image
            src={img || logo}
            width={400}
            alt="img"
            loading="lazy"
            height={0}
            className="rounded-lg group-hover:scale-110 grayscale group-hover:grayscale-0 transition ease-linear"
          />
        </div>
        <div className="flex flex-col gap-2 md:ps-6 sm:ps-6 px-2 sm:w-[80dvw] ">
          <span>
            <p className="text-2xl sm:text-xl font-semibold line-clamp-1 text-text">
              {title}
            </p>
            <p className="font-semibold text-black/50 sm:text-sm">
              Subject : <span className="font-bold">{subject}</span>
            </p>
          </span>

          <span className="flex gap-x-10 text-text">
            <p className="font-medium text-text sm:text-sm">
              Total MCQs: <span>{mcq}</span>
            </p>

            <span className="flex items-center gap-x-1">
              {/* <TbUserShield className="text-text" />{" "} */}
              <p className="font-medium text-text sm:text-sm">
                Difficulty: <span>{difficulty}</span>
              </p>
            </span>
            <span className="flex items-center gap-x-1">
              <LuMonitorPlay className="text-text" />
              <p className="font-medium sm:text-sm line-clamp-1">
                {totalPlayed}
              </p>
            </span>
          </span>

          <p className="line-clamp-2 text-text/60 pe-3 sm:text-sm">{desc}</p>

          <div className="flex gap-x-1 overflow-hidden">
            {tag.slice(1, 4).map((tag, index) => {
              return (
                <p
                  key={index}
                  className="bg-darkGreen/70 cursor-pointer text-black font-medium px-3 py-2 rounded text-xs hover:bg-darkGreen transition ease-in">
                  {tag}
                </p>
              );
            })}
          </div>
          <div className="flex justify-end me-4 sm:me-1 mb-1">
            <button
              onClick={() => {
                router.push(`/Quiz/${QuizId}`);
              }}
              className="bg-text text-white px-5 py-2 rounded text-sm hover:bg-text/80 transition ease-in">
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizCard;
