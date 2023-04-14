import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";

import Logo from "../../public/unveil_logo_cropped.png";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}
export default function LoginModal({ isOpen, closeModal }: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setInputs({
      ...inputs,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setErrMsg("");
      setIsSubmitting(true);
      await axios.post("http://localhost:8080/users/login", inputs, {
        withCredentials: true,
      });
      setIsSubmitting(false);
      setInputs({ email: "", password: "" });
      closeModal();
      router.push("/dashboard");
      mutate("/api/auth");
    } catch (err: any) {
      setIsSubmitting(false);
      if (err?.response?.data?.msg) {
        setErrMsg(err.response.data.msg);
      } else {
        setErrMsg("An error occured, please try again");
      }
      console.log(err?.response);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setInputs({ email: "", password: "" });
      setErrMsg("");
    }
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="text-slate-200 w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1A202D] p-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-3xl font-medium flex items-center text-center"
                  >
                    <Image
                      src={Logo}
                      alt="Unveil"
                      width={35}
                      height={35}
                      className="mr-3"
                    />
                    <span className="">Welcome back!</span>
                  </Dialog.Title>

                  <div className="mt-8">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col items-center"
                    >
                      <input
                        type="text"
                        name="email"
                        value={inputs.email}
                        required
                        placeholder="Email"
                        className="p-2 px-4 mb-3 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-2xl bg-[#171D28] text-slate-200"
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        required
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="p-2 px-4 mb-3 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-2xl bg-[#171D28] text-slate-200"
                      />
                      {errMsg && (
                        <div className="text-red-500 self-start mt-3">
                          {errMsg}
                        </div>
                      )}
                      <button
                        type="submit"
                        className={`py-2 px-6 font-medium mt-5 bg-red-500 text-slate-200 rounded-xl self-start ${
                          isSubmitting && "opacity-80"
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging..." : "Login"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
