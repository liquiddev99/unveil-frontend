import Image from "next/image";
import Logo from "../../public/unveil_logo_cropped.png";
import Link from "next/link";
import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex justify-between mt-32 pb-20">
      <div className="w-1/3">
        <div className="flex items-center">
          <Image src={Logo} alt="Logo" width={60} height={60} />
          <span
            className={`ml-2 mt-1 text-slate-100 text-3xl font-semibold bg-gradient-to-r from-pink to-purple text-transparent bg-clip-text`}
          >
            Unveil
          </span>
        </div>
        <p className="text-[#989CAD] mt-4">
          With Unveil by your side, you can enjoy peace of mind knowing that
          your online identity is protected by the highest level of security.
        </p>
        <div className="flex text-[#989CAD] mt-4 items-center">
          <Link href="#" className="mr-3 hover:text-pink transition-colors">
            <FaGithub className="w-7 h-7" />
          </Link>
          <a
            target="_blank"
            href="https://www.facebook.com/liquiddev99"
            className="mr-3 hover:text-pink transition-colors"
          >
            <FaFacebook className="w-7 h-7" />
          </a>
          <Link href="#" className="mr-3 hover:text-pink transition-colors">
            <FaTwitter className="w-7 h-7" />
          </Link>

          <Link href="#" className="mr-3 hover:text-pink transition-colors">
            <FaDiscord className="w-8 h-8" />
          </Link>
          <Link href="#" className="mr-3 hover:text-pink transition-colors">
            <FaLinkedin className="w-7 h-7" />
          </Link>
        </div>
      </div>

      <div className="flex justify-center ml-10">
        <div className="mr-16">
          <p className="mb-7 font-medium">INFOMATION</p>
          <div className="flex flex-col">
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit"
            >
              Media
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit"
            >
              Blog
            </Link>
          </div>
        </div>

        <div className="mr-16">
          <p className="mb-7 font-medium">LEGAL</p>
          <div className="flex flex-col">
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit whitespace-nowrap"
            >
              Privacy policy
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit whitespace-nowrap"
            >
              Cookies policy
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit whitespace-nowrap"
            >
              Security policy
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit whitespace-nowrap"
            >
              License FAQs
            </Link>
          </div>
        </div>

        <div className="mr-16">
          <p className="mb-7 font-medium">PRODUCT</p>
          <div className="flex flex-col">
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit"
            >
              Documentation
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit"
            >
              Installation
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit"
            >
              Features
            </Link>
            <Link
              href="#"
              className="hover:text-pink text-[#989CAD] transition-colors mb-3 max-w-fit"
            >
              Releases
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <Image src={Logo} alt="Unveil" width={270} height={270} />
      </div>
    </div>
  );
}
