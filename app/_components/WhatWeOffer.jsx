import React from "react";
import CardItem from "./CardItem";
import img1 from "../assets/images/engage.png";
import img2 from "../assets/images/leader.webp";
import img3 from "../assets/images/performance.png";
import img4 from "../assets/images/education.png";

const WhatWeOffer = () => {
  return (
    <div className="px-10 py-4 flex flex-wrap gap-3 justify-around">
      <CardItem
        title="Engaging and Diverse Quizzes"
        Icon={img1}
        color="bg-[#549A5B]"
      />
      <CardItem
        title="Real-Time Leaderboards"
        Icon={img2}
        color="bg-[#FF6E3C]"
      />
      <CardItem
        title="Detailed Performance Analytics"
        Icon={img3}
        color="bg-[#97547F]"
      />
      <CardItem
        title="Educational Informative Resources"
        Icon={img4}
        color="bg-[#00A986]"
      />
    </div>
  );
};

export default WhatWeOffer;
