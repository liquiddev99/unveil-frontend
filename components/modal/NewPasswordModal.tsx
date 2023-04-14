import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useSWRConfig } from "swr";

import Logo from "../../public/unveil_logo_cropped.png";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}
export default function NewPasswordModal({ isOpen, closeModal }: Props) {
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    value: "",
    website: "",
    note: "",
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
      setErrMsg("");
      e.preventDefault();
      setIsSubmitting(true);
      await axios.post("http://localhost:8080/passwords/create", inputs, {
        withCredentials: true,
      });
      mutate("/api/passwords");
      setIsSubmitting(false);
      closeModal();
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
      setInputs({ username: "", name: "", value: "", website: "", note: "" });
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
                    <span className="">New Password</span>
                  </Dialog.Title>

                  <div className="mt-8">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col items-center"
                    >
                      <input
                        type="text"
                        name="name"
                        value={inputs.name}
                        required
                        placeholder="Name"
                        className="p-2 px-4 mb-3 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-xl bg-[#171D28] text-slate-200"
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="username"
                        value={inputs.username}
                        required
                        placeholder="Email, Phone Number,..."
                        className="p-2 px-4 mb-3 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-xl bg-[#171D28] text-slate-200"
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        required
                        name="value"
                        value={inputs.value}
                        onChange={handleChange}
                        placeholder="Value"
                        className="p-2 px-4 mb-3 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-xl bg-[#171D28] text-slate-200"
                      />
                      <input
                        type="text"
                        name="website"
                        value={inputs.website}
                        placeholder="https://example.com"
                        className="p-2 px-4 mb-3 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-xl bg-[#171D28] text-slate-200"
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="note"
                        value={inputs.note}
                        placeholder="Notes"
                        className="p-2 px-4 mb-3 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-xl bg-[#171D28] text-slate-200"
                        onChange={handleChange}
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
                        {isSubmitting ? "Creating..." : "Create"}
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
