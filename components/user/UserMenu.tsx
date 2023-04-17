import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoFastFood } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { useSWRConfig } from "swr";

export default function UserMenu() {
  const { mutate } = useSWRConfig();

  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  const logout = async () => {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
    if (process.env.NODE_ENV === "production") {
      apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;
    }
    await axios.post(`${apiUrl}/users/logout`, {}, { withCredentials: true });
    clearCache();
    mutate("/api/auth");
  };

  return (
    <Menu as="div" className="relative text-left ml-3">
      <div className="flex items-center">
        <Menu.Button className="">
          <FaUserCircle className="h-7 w-7" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="text-slate-300 absolute right-0 mt-2 w-48 origin-top-right divide-y divide-slate-200 rounded-md bg-[#272E3C] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={`${
                    active ? "bg-red-500" : ""
                  } group flex w-full items-center rounded-md px-2 py-2`}
                >
                  <BiUserCircle className="mr-2 h-6 w-6" />
                  My Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-500" : ""
                  } group flex w-full items-center rounded-md px-2 py-2`}
                >
                  <IoFastFood className="mr-2 h-6 w-6" />
                  Favorite Recipes
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-500" : ""
                  } group flex w-full items-center rounded-md px-2 py-2`}
                  onClick={logout}
                >
                  <HiOutlineLogout className="h-6 w-6 mr-2" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
