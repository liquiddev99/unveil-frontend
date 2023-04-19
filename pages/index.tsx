import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiTerminal } from "react-icons/hi";

import HeroImage from "../public/heroimage.svg";
import WhyUse1 from "../public/whyuse1.svg";
import WhyUse2 from "../public/whyuse2.svg";
import WhyUse3 from "../public/whyuse3.svg";
import WhyUse4 from "../public/whyuse4.png";
import WhyUse5 from "../public/terminal.png";

import SignUpModal from "@/components/modal/SignUpModal";
import LoginModal from "@/components/modal/LoginModal";

import { useAuth } from "../hooks/auth";

export default function Home() {
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const { authenticated, loading } = useAuth();

  return (
    <main className="">
      <div className="flex justify-between layout">
        <div className="mt-[5.5rem]">
          <h1 className="text-6xl font-semibold leading-[1.1]">
            The ultimate{" "}
            <span
              className={`bg-gradient-to-r from-pink to-purple text-transparent bg-clip-text`}
            >
              password manager{" "}
            </span>
            that keeps your life{" "}
            <span
              className={`bg-gradient-to-r from-pink to-purple text-transparent bg-clip-text`}
            >
              safe{" "}
            </span>
            and{" "}
            <span
              className={`bg-gradient-to-r from-pink to-purple text-transparent bg-clip-text`}
            >
              secure
            </span>
          </h1>
          <h2 className="text-3xl font-semibold my-3">
            Never forget a password again.
          </h2>

          <div className="flex items-center mt-6">
            {!loading ? (
              <>
                {authenticated ? (
                  <Link
                    href="/dashboard"
                    className="bg-gradient-to-r from-pink to-purple font-semibold py-4 px-8 text-lg rounded-full flex items-end leading-none transition-all duration-150 hover:shadow-neon hover:shadow-pink hover:scale-105 mr-5"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => setSignUpModal(true)}
                    className="bg-gradient-to-r from-pink to-purple font-semibold py-4 px-8 text-lg rounded-full flex items-end leading-none transition-all duration-150 hover:shadow-neon hover:shadow-pink hover:scale-105 mr-5"
                  >
                    Getting Started
                  </button>
                )}
              </>
            ) : (
              <div className="w-48"></div>
            )}

            <button className="drop-shadow-md flex items-center text-lg leading-none bg-[#272e3c] hover:bg-gradient-to-r hover:from-pink hover:to-purple hover:shadow-neon hover:shadow-pink transition-all duration-150 hover:text-slate-200 hover:scale-105 text-slate-400 font-semibold py-4 px-8 rounded-full">
              <span>
                <HiTerminal className="w-5 h-5 mr-2" />
              </span>
              Install CLI
            </button>
          </div>
        </div>

        <div>
          <Image src={HeroImage} alt="Hero Image" width={1900} height={1900} />
        </div>
      </div>

      <div className="text-center mt-10">
        <h2 className="text-4xl font-semibold">
          Why use{" "}
          <span
            className={`bg-gradient-to-r from-pink to-purple text-transparent bg-clip-text`}
          >
            Unveil
          </span>
          ?
        </h2>
        <p className="text-[#989CAD] max-w-[800px] mx-auto mt-3">
          In today's digital world, managing multiple passwords can be a hassle,
          especially when each one needs to be strong and unique. That's where
          Unveil comes in – we make it easy for you to store, manage and access
          all your passwords from one secure location.
        </p>
      </div>

      <div className="py-20 layout">
        <div className="flex items-center mt-32 gap-x-44 justify-between">
          <Image src={WhyUse2} alt="Finger Print" width={450} height={450} />
          <div className="mb-4">
            <p className="text-3xl font-medium mb-4">
              Generates strong, unique passwords, providing security for your
              data.
            </p>
            <p className="text-[#989CAD]">
              Unveil does more than just store your passwords – we also help you
              generate strong, unique passwords for all your accounts. Say
              goodbye to weak and easily hackable passwords, and hello to peace
              of mind knowing that your data is protected by the highest level
              of security.
            </p>
          </div>
        </div>

        <div className="flex items-center mt-32 gap-x-40 justify-between">
          <div className="mb-4">
            <p className="text-3xl font-medium mb-4">
              Storing your password serurely, no more forgetting password
            </p>
            <p className="text-[#989CAD]">
              With Unveil, you'll never have to worry about forgetting a
              password again. Simply create a master password and let our app do
              the rest. We use state-of-the-art encryption technology to ensure
              that your data is always safe and secure, and our intuitive
              interface makes it easy for you to organize your passwords and
              keep track of your accounts.
            </p>
          </div>
          <Image
            src={WhyUse1}
            alt="Generate Password"
            width={550}
            height={550}
          />
        </div>
        <div className="flex items-center mt-32 gap-x-44 justify-between">
          <Image src={WhyUse3} alt="convenient" width={450} height={450} />
          <div className="mb-4 grow">
            <p className="text-3xl font-medium mb-4">
              Hassle-free of managing multiple passwords with the convenience
            </p>
            <p className="text-[#989CAD]">
              With Unveil, managing your passwords is a breeze - our intuitive
              interface and user-friendly design make it simple and convenient
              for you to organize, access and secure all your passwords in one
              place, help you save your time and effort, allowing you to
              effortlessly log into your accounts with just one click
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#171D28] py-24">
        <div className="layout">
          <div className="flex items-center gap-x-24 justify-between mb-36">
            <div className="mb-4 grow">
              <p className="text-3xl font-medium mb-4">
                Effortlessly manage your passwords with our app's UI/UX.
              </p>
              <p className="text-[#989CAD]">
                With its intuitive and user-friendly interface, Unveil is
                designed to make password management as seamless and stress-free
                as possible, we've crafted every aspect of the interface to
                ensure accessibility and ease of use.
              </p>
            </div>
            <Image
              src={WhyUse4}
              alt="Dashboard"
              width={650}
              height={650}
              className="shadow-2xl"
            />
          </div>
          <div className="flex items-center gap-x-24 justify-between">
            <Image
              src={WhyUse5}
              alt="Dashboard"
              width={630}
              height={630}
              className="shadow-2xl"
            />
            <div className="mb-4 grow">
              <p className="text-3xl font-medium mb-4">
                Seamlessly integrate password management with our CLI feature.
              </p>
              <p className="text-[#989CAD]">
                For power users who prefer the command line interface, Unveil
                offers a robust CLI feature that enables you to easily manage
                your passwords without ever leaving the terminal, making
                password management faster and more efficient.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SignUpModal
        isOpen={signUpModal}
        closeModal={() => setSignUpModal(false)}
      />
      <LoginModal isOpen={loginModal} closeModal={() => setLoginModal(false)} />
    </main>
  );
}
