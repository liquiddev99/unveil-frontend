import { useState } from "react";
import Image from "next/image";
import Logo from "../../public/unveil_logo.png";
import Link from "next/link";

import SignUpModal from "../modal/SignUpModal";
import LoginModal from "@/components/modal/LoginModal";
import { useAuth } from "@/hooks/auth";
import UserMenu from "../user/UserMenu";

export default function Header() {
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const { authenticated, loading } = useAuth();

  return (
    <div className="py-8 layout">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
            <Image src={Logo} alt="Logo" width={60} height={60} />
            <span
              className={`ml-2 mt-1 text-slate-100 text-3xl font-semibold bg-gradient-to-r from-pink to-purple text-transparent bg-clip-text`}
            >
              Unveil
            </span>
          </div>
        </Link>

        <div className="flex items-center">
          <Link
            href="/"
            className="mr-7 font-medium hover:text-pink transition-colors duration-100"
          >
            Home
          </Link>
          <Link
            href="#"
            className="mr-7 font-medium hover:text-pink transition-colors duration-100"
          >
            Install CLI
          </Link>
          <Link
            href="#"
            className="mr-7 font-medium hover:text-pink transition-colors duration-100"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="mr-7 font-medium hover:text-pink transition-colors duration-100"
          >
            Community
          </Link>
          {!loading ? (
            <>
              {authenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="mr-7 font-medium hover:text-pink transition-colors duration-100"
                  >
                    Dashboard
                  </Link>
                  <UserMenu />
                </>
              ) : (
                <>
                  <button
                    onClick={() => setLoginModal(true)}
                    className="drop-shadow-md leading-none border border-[#272e3c] bg-[#272e3c] hover:bg-gradient-to-r hover:from-pink hover:to-purple hover:shadow-neon hover:shadow-pink transition-all duration-150 hover:text-slate-200 hover:scale-110 text-slate-400 font-semibold py-3 px-7 rounded-full mr-5"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setSignUpModal(true)}
                    className="leading-none bg-gradient-to-r from-pink to-purple font-semibold py-3 px-7 rounded-full flex items-end transition-all duration-150 hover:shadow-pink hover:shadow-neon hover:scale-110"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-44"></div>
          )}
        </div>
      </div>
      <SignUpModal
        isOpen={signUpModal}
        closeModal={() => setSignUpModal(false)}
      />
      <LoginModal isOpen={loginModal} closeModal={() => setLoginModal(false)} />
    </div>
  );
}
