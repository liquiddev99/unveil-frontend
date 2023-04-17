import { FaUserCircle } from "react-icons/fa";
import { MdSettings, MdWallet } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { AiFillGift } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "@/hooks/auth";

export default function SideBar() {
  const router = useRouter();
  const { pathname } = router;
  const { user } = useAuth();

  return (
    <div className="min-w-[250px] mt-1 mr-5">
      <div className="pl-3 flex items-center mb-6">
        <FaUserCircle className="w-7 h-7 mr-4" />
        <span className="text-xl truncate max-w-[150px]">
          {user && user.username}
        </span>
      </div>
      <Link
        href="/dashboard"
        className={`flex items-center ${
          pathname === "/dashboard"
            ? "text-pink"
            : "text-blur hover:text-slate-100"
        } pl-3 py-2 my-2 hover:bg-slate-700 transition-colors rounded cursor-pointer`}
      >
        <GoKey className="w-6 h-6 mr-3" />
        Passwords
      </Link>
      <Link
        href="/dashboard/settings"
        className={`flex items-center ${
          pathname === "/dashboard/settings"
            ? "text-pink"
            : "text-blur hover:text-slate-100"
        } pl-3 py-2 my-2 hover:bg-slate-700 transition-colors rounded cursor-pointer`}
      >
        <MdSettings className="w-6 h-6 mr-3" />
        Settings
      </Link>
      <Link
        href="#"
        className={`flex items-center ${
          pathname === "mock" ? "text-pink" : "text-blur hover:text-slate-100"
        } pl-3 py-2 my-2 hover:bg-slate-700 transition-colors rounded cursor-pointer`}
      >
        <HiLockClosed className="w-6 h-6 mr-3" />
        Security
      </Link>
      <Link
        href="#"
        className={`flex items-center ${
          pathname === "mock" ? "text-pink" : "text-blur hover:text-slate-100"
        } pl-3 py-2 my-2 hover:bg-slate-700 transition-colors rounded cursor-pointer`}
      >
        <MdWallet className="w-6 h-6 mr-3" />
        Billing
      </Link>
      <Link
        href="#"
        className={`flex items-center ${
          pathname === "mock" ? "text-pink" : "text-blur hover:text-slate-100"
        } pl-3 py-2 my-2 hover:bg-slate-700 transition-colors rounded cursor-pointer`}
      >
        <AiFillGift className="w-6 h-6 mr-3" />
        Referrals
      </Link>
    </div>
  );
}
