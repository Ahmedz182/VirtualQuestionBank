import React from "react";
import FAQSection from "@/app/_components/FAQSection";
import Challange from "@/app/_components/Challange";
import Link from "next/link";
export const metadata = {
  title: "About Us - Virtual Question Bank",
  description: "Unlock your Potential with every Question.",
};

export default function About() {
  return (
    <>
      <h1 className="text-4xl md : text-3xl sm : text-2xl text-gray-800 font-bold mb-6 px-20 pt-10 sm:px-10">
        About Us
      </h1>
      <div className="min-h-[90dvh] text-text bg-gray-50  flex flex-col items-start ps-20 pe-32 sm:ps-10 sm:pe-10">
        <p className="text-lg tracking-wide text-gray-700 mb-6   ">
          At Virtual Question Bank, we believe that learning should be fun,
          engaging, and accessible to everyone. Our mission is to create an
          innovative platform that transforms the traditional quiz experience
          into a dynamic and interactive journey.
        </p>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold tracking-wider text-gray-800 mb-4 ">
            Our Vision
          </h2>
          <p className="text-lg tracking-wide text-gray-700   mb-4">
            Our vision is to revolutionize the way people learn and test their
            knowledge. We aim to provide an environment where users can
            challenge themselves, explore new topics, and track their progress,
            all while having fun.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold tracking-wider text-gray-800 mb-4 ">
            Our Features
          </h2>
          <ul className="text-lg text-gray-700 space-y-4  ps-5  mx-auto">
            <li>
              <strong className="text-gray-900">Wide Range of Topics : </strong>
              Whether you&apos;re interested in science, history, technology, or
              pop culture, we&apos;ve got you covered with quizzes spanning a
              variety of subjects.
            </li>
            <li>
              <strong className="text-gray-900">
                User-Friendly Interface :
              </strong>
              Our app is designed with you in mind. Navigate through our quizzes
              with ease and enjoy a seamless experience.
            </li>
            <li>
              <strong className="text-gray-900">Interactive Learning : </strong>
              Engage with content that not only tests your knowledge but also
              helps you learn more. Each question is an opportunity to discover
              something new.
            </li>
            <li>
              <strong className="text-gray-900">Progress Tracking : </strong>
              Keep track of your achievements and see how you improve over time.
              Our app allows you to monitor your performance and set personal
              goals.
            </li>
            <li>
              <strong className="text-gray-900">
                Community and Competitions :
              </strong>
              Join our community of quiz enthusiasts! Compete with friends,
              share your scores, and climb the leaderboard.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold tracking-wider text-gray-800 mb-4 ">
            Our Team
          </h2>
          <p className="text-lg tracking-wide text-gray-700   mx-auto mb-4">
            We are a passionate team of educators, developers, and designers
            dedicated to bringing you the best quiz experience possible. Our
            combined expertise allows us to create a platform that is both
            educational and entertaining.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold tracking-wider text-gray-800 mb-4 ">
            Contact Us
          </h2>
          <p className="text-lg tracking-wide text-gray-700   mx-auto mb-4">
            We&apos;d love to hear from you! If you have any questions,
            suggestions, or feedback, please feel free to reach out to us at{" "}
            <a
              className="text-darkGreen font-medium underline"
              href="mailto : ahmedmughal3182@gmail.com">
              Email Us
            </a>{" "}
            or
            <Link href="/contact-us">
              <span className="text-darkGreen font-medium underline">
                Contact Us
              </span>
            </Link>
            follow us on social media.
          </p>
        </section>
      </div>
      <Challange />
      <FAQSection />
    </>
  );
}
