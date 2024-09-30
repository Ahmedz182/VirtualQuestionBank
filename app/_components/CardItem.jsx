import React from "react";
import Image from "next/image";
const CardItem = ({ title, Icon, color }) => {
  return (
    <>
      <div
        className={` group w-64 h-64 flex flex-col py-2 ${color}  gap-y-5 cursor-pointer shadow-lg  items-center justify-center drop-shadow-md outline outline-1 outline-text/10 rounded-2xl hover:translate-y-[-10px] transition ease-in `}>
        <Image
          className="group-hover:scale-125 transition ease-in object-fill"
          src={Icon}
          alt={title}
          width={130}
          height={130}
        />
        <p className="text-white mx-5    text-xl font-medium text-center ">
          {title}
        </p>
      </div>
    </>
  );
};

export default CardItem;
