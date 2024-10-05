import React from "react";
import Image from "next/image";
import logo from "/public/images/logo.png";
import { FaFacebook } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="flex md:flex-col sm:flex-col gap-y-5 bg-silver text-text justify-around  py-10 px-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <span className="flex flex-col items-center md:items-start sm:items-start">
          <Image src={logo} width={160} height={160} alt="logo" />
          <p className="text-text  font-bold text-xl  md:text-lg sm:text-base tracking-wider cursor-pointer">
            Vitual
            <span className="font-medium text-darkGreen "> Question Bank</span>
          </p>
        </span>
        <span className="flex   flex-col gap-y-2 ">
          <span className="flex mb-2">
            <p className="text-text font-bold text-3xl tracking-widest">
              Pages
            </p>
          </span>
          <ul className="flex flex-col  text-lg text-text/90 gap-y-2 font-medium  ">
            <Link href="/about-us">
              <li className="cursor-pointer">About Us</li>
            </Link>
            <Link href="/contact-us">
              <li className="cursor-pointer  ">Contact Us</li>
            </Link>
            <li className="cursor-pointer ">Privacy Policy</li>
            <li className="cursor-pointer">Terms & Condition</li>
          </ul>
        </span>
        <span className="flex   flex-col gap-y-3 ">
          <span className="flex">
            <p className="text-text mb-2 font-bold text-3xl tracking-widest">
              Social
            </p>
          </span>

          <ul className="flex gap-x-4 font-medium">
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
          <p className="text-lg text-text/90 gap-y-2 font-medium">
            Follow us on Social Media
          </p>
        </span>

        <span className="flex  flex-col items-center justify-center text-text/90">
          <span> Design & Develop by Muhammad Ahmed Fayyaz</span>
          Made in Pakistan with ❤️.
        </span>
      </div>
    </>
  );
};

export default Footer;
