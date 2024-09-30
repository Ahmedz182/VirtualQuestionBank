import React from "react";
import FAQSection from "@/app/_components/FAQSection";
import Challange from "@/app/_components/Challange";
export const metadata = {
  title: "About Us - Virtual Question Bank",
  description: "Unlock your Potential with every Question.",
};

export default function About() {
  return (
    <>
      <div className="min-h-[90dvh] text-text">
        <p className="-tracking-tight text-7xl md:text-5xl sm:text-3xl text-text/20 font-black px-10 pt-10 pb-7">
          About Us
        </p>

        <p className="px-10 text-2xl/snug tracking-wider">
          At Virtual Question Bank, we believe that learning should be fun,
          engaging, and accessible to everyone. Our mission is to create an
          innovative platform that transforms the traditional quiz experience
          into a dynamic and interactive journey.
        </p>
        <span className="flex flex-col gap-4 pb-10">
          <p className="px-10 pt-10 text-4xl font-semibold tracking-wider">
            Our Vision
          </p>
          <p className="px-10 text-2xl tracking-wider text-text/85">
            Our vision is to revolutionize the way people learn and test their
            knowledge. We aim to provide an environment where users can
            challenge themselves, explore new topics, and track their progress,
            all while having fun.
          </p>
          <p className="px-10 pt-10 text-4xl font-semibold tracking-wider">
            Our Features
          </p>
          <ul className="px-16 text-2xl flex flex-col gap-4 text-text/85 py-5">
            <li>
              -<strong className="text-text/95">Wide Range of Topics : </strong>
              Whether you&aposre interested in science, history, technology, or
              pop culture, we&aposve got you covered with quizzes spanning a
              variety of subjects.
            </li>
            <li>
              -
              <strong className="text-text/95">
                User-Friendly Interface :
              </strong>
              Our app is designed with you in mind. Navigate through our quizzes
              with ease and enjoy a seamless experience.
            </li>
            <li>
              -<strong className="text-text/95">Interactive Learning : </strong>
              Engage with content that not only tests your knowledge but also
              helps you learn more. Each question is an opportunity to discover
              something new.
            </li>
            <li>
              - <strong className="text-text/95">Progress Tracking : </strong>
              Keep track of your achievements and see how you improve over time.
              Our app allows you to monitor your performance and set personal
              goals.
            </li>
            <li>
              -
              <strong className="text-text/95">
                Community and Competitions :
              </strong>
              Join our community of quiz enthusiasts! Compete with friends,
              share your scores, and climb the leaderboard.
            </li>
          </ul>
          <p className="px-10 pt-10 text-4xl font-semibold tracking-wider">
            Our Team
          </p>
          <p className="px-10 text-2xl tracking-wider text-text/85">
            We are a passionate team of educators, developers, and designers
            dedicated to bringing you the best quiz experience possible. Our
            combined expertise allows us to create a platform that is both
            educational and entertaining.
          </p>
          <p className="px-10 pt-10 text-4xl font-semibold tracking-wider">
            Contact Us
          </p>
          <p className="px-10 text-2xl tracking-wider text-text/85">
            We&aposd love to hear from you! If you have any questions,
            suggestions, or feedback, please feel free to reach out to us at
            <a
              className="text-darkGreen px-1 font-medium"
              href="mailto:ahmedmughal3182@gmail.com">
              Email Us
            </a>{" "}
            or follow us on social media.
          </p>
        </span>
        <Challange />
        <FAQSection />
      </div>
    </>
  );
}
