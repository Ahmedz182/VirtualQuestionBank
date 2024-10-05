import React from "react";
import phone from "@/public/images/phone.avif"; // Ensure the path is correct
import { FaFacebook, FaGithub, FaWhatsapp } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

const SocialLinks = () => {
  return (
    <ul className="flex gap-x-4 justify-center items-center">
      <li className="cursor-pointer text-text/90 text-2xl group hover:scale-110 transition ease-in">
        <a
          href="https://www.facebook.com/ahmedx182"
          target="_blank"
          rel="noopener noreferrer">
          <FaFacebook className="group-hover:text-[#1877F2]" />
        </a>
      </li>

      <li className="cursor-pointer text-text/90 text-2xl group hover:scale-110 transition ease-in">
        <a
          href="https://www.instagram.com/ahmedz182"
          target="_blank"
          rel="noopener noreferrer">
          <GrInstagram className="group-hover:text-[#C13584]" />
        </a>
      </li>

      <li className="cursor-pointer text-text/90 text-2xl group hover:scale-110 transition ease-in">
        <a
          href="https://github.com/ahmedz182"
          target="_blank"
          rel="noopener noreferrer">
          <FaGithub className="group-hover:text-black" />
        </a>
      </li>

      <li className="cursor-pointer text-text/90 text-2xl group hover:scale-110 transition ease-in">
        <a
          href={`https://wa.me/923246983182`}
          target="_blank"
          rel="noopener noreferrer">
          <FaWhatsapp className="group-hover:text-[#075E54]" />
        </a>
      </li>
    </ul>
  );
};

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-10">
      <div className="bg-white rounded-lg shadow-lg flex  sm:flex-col md:flex-col max-w-4xl w-full">
        <div className="relative w-1/2 sm:w-full ">
          <div
            className="h-full sm:hidden md:hidden bg-text rounded-t-lg md:rounded-l-lg"
            style={{
              backgroundImage: `url(${phone.src})`,
              backgroundSize: "cover",
            }}>
            <div className="absolute sm:hidden md:hidden bottom-10 left-24 backdrop-blur-lg bg-white/20 p-4 rounded border border-white/20">
              <p className="text-text text-xl pb-5 text-center">
                Follow us on Social Media
              </p>
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="w-1/2 sm:w-full md:w-full  p-8">
          <h2 className="text-2xl font-bold mb-6 text-text">
            Get in Touch With Us
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-text text-sm font-bold mb-2"
                htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-text text-sm font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-text text-sm font-bold mb-2"
                htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Message"
                rows="5"></textarea>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-text hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
