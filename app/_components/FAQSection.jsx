"use client";
import { useState } from "react";

const FAQSection = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I sign up for an account?",
      answer:
        "To sign up for an account, click on the Account button on the Nav. Fill in your details such as name, email, and password, then click Create Account. You will receive a confirmation email. Follow the instructions in the email to complete your registration.",
    },
    {
      question: "Can I play quizzes without signing up",
      answer:
        "Yes, you can play some quizzes without signing up. However, signing up allows you to track your progress, save your scores, and access personalized features.",
    },
    {
      question: "How do I track my quiz performance?",
      answer:
        "After signing in, go to your profile page to see a summary of your quiz performance. You can view detailed statistics on your completed quizzes, scores, and progress over time.",
    },
    {
      question: "How do I report a problem with a quiz?",
      answer:
        "If you encounter a problem with a quiz, click on the Report Issue button usually found at the end of the quiz or in the quiz details page. Provide a brief description of the problem, and our team will review and address it promptly.",
    },
    {
      question: "Is my progress saved automatically?",
      answer:
        "Yes, your progress is saved automatically as you take a quiz, so you can resume it later if you need to pause. Make sure you are logged in to have your progress saved to your account.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "If you wish to delete your account, go to the Account Settings section after logging in. There, you will find an option to delete your account. Note that this action is irreversible and all your data will be permanently removed.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "For any assistance or inquiries, you can contact our customer support team by clicking on the Contact Us link at the bottom of the homepage. Fill in the contact form, and our team will get back to you as soon as possible.",
    },
  ];

  return (
    <div className="pb-10 px-8 sm:px-5   flex md:flex-col sm:flex-col items-center   gap-10 text-text">
      <div className="flex flex-col text-left  px-10 sm:px-5  items-center justify-center">
        <p className="sm:text-4xl text-5xl font-extrabold  text-base-content tracking-wider">
          Frequently Asked Questions
        </p>
      </div>
      <ul className=" px-16 sm:px-8">
        {faqs.map((faq, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-b md:text-lg border-base-content/10"
              aria-expanded={expanded === index}
              onClick={() => toggleFAQ(index)}>
              <span className="flex-1 text-base-content">{faq.question}</span>
              <svg
                className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition-transform transform ${
                  expanded === index ? "rotate-90" : ""
                }`}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="16" height="2" rx="1"></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className="rotate-90"></rect>
              </svg>
            </button>
            <div
              className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                expanded === index ? "max-h-96" : "max-h-0"
              }`}
              style={{ transition: "max-height 0.3s ease-in-out" }}>
              <div className="pt-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQSection;
