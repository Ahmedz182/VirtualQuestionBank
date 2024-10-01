import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SubjectCard = ({ title, desc, img }) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => {
          router.push(`/Quiz/subject/${title}`);
        }}
        className="bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] group flex flex-col bg-silver bg-opacity-50 hover:bg-opacity-90 gap-y-5 pt-2 cursor-pointer pb-5 rounded-xl w-60 sm:w-[85dvw] border border-1 border-text/10  hover:translate-y-[-10px] transition ease-in">
        <span className="w-60 sm:w-fit  ms-[-15px] object-cover ">
          <Image
            src={img}
            alt={title}
            width={240}
            height={100}
            className=" shadow-md rounded-2xl h-[130px] sm:h-[30dvh] sm:w-[85dvw] group-hover:scale-105 transition ease-in"
          />
        </span>
        <div className="flex flex-col gap-y-2 text-text px-3 pb-1">
          <p className="text-xl font-bold line-clamp-1">{title}</p>
          <p className="line-clamp-2 text-text/60">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default SubjectCard;
