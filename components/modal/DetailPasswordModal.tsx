import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useSWRConfig } from "swr";
import { BiTrash, BiWorld, BiCopy, BiTimeFive } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { PasswordItem } from "@/types/password";
import { usePassword } from "@/hooks/password";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { toast } from "react-toastify";

interface Props {
  password: PasswordItem | undefined;
  isOpen: boolean;
  closeModal: () => void;
}
export default function DetailPasswordModal({
  isOpen,
  closeModal,
  password,
}: Props) {
  const { mutate } = useSWRConfig();
  const [favicon, setFavicon] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [isNewForm, setIsNewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    website: "",
    note: "",
    created_at: "",
  });

  const [value, setValue] = useState("");

  const { password: detailPassword } = usePassword(password?.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setInputs({
      ...inputs,
      [name]: e.target.value,
    });
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setErrMsg("");
      e.preventDefault();
      setIsSubmitting(true);
      const inputsForm: any = inputs;
      if (value !== detailPassword?.value) inputsForm["value"] = value;
      await axios.put(
        `http://localhost:8080/passwords/name/${password?.name}`,
        inputs,
        {
          withCredentials: true,
        }
      );
      mutate("/api/passwords");
      setIsSubmitting(false);
      closeModal();
    } catch (err: any) {
      setIsSubmitting(false);
      if (err?.response?.data) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg("An error occured, please try again");
      }
      console.log(err?.response);
    }
  };

  useEffect(() => {
    if (!password) return;
    setInputs({
      username: password.username,
      name: password.name,
      website: password.website,
      note: password.note,
      created_at: password.created_at,
    });
  }, [password]);

  useEffect(() => {
    if (detailPassword) {
      setValue(detailPassword.value);
    }
  }, [detailPassword]);

  useEffect(() => {
    if (isOpen) {
      setFavicon(true);
      setErrMsg("");
      setHidden(true);
      setIsNewForm(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!detailPassword || !password) return;
    if (
      value !== detailPassword.value ||
      inputs.name !== password.name ||
      inputs.note !== password.note ||
      inputs.website !== password.website ||
      inputs.username !== password.username
    ) {
      setIsNewForm(true);
      return;
    }
    setIsNewForm(false);
  }, [inputs, value]);

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
                <Dialog.Panel className="text-slate-200 w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#1A202D] p-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-3xl font-medium flex items-center text-center"
                  >
                    {favicon ? (
                      <Image
                        src={`https://www.google.com/s2/favicons?domain=${password?.website}&sz=128`}
                        alt="favicon"
                        width={36}
                        height={36}
                        className="mr-4"
                        onError={() => setFavicon(false)}
                      />
                    ) : (
                      <BiWorld className="h-8 w-8 mr-4" />
                    )}
                    <span className="">Password Detail</span>
                  </Dialog.Title>

                  <div className="mt-8">
                    <form onSubmit={handleSubmit} className="">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-1 inline-block cursor-pointer text-sm text-blur"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={inputs.name}
                            required
                            placeholder="Name"
                            className="p-2 px-4 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-lg bg-[#171D28] text-slate-200"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="mb-1 inline-block cursor-pointer text-sm text-blur"
                          >
                            Username
                          </label>
                          <input
                            id="username"
                            type="text"
                            name="username"
                            value={inputs.username}
                            required
                            placeholder="Email, Phone Number,..."
                            className="p-2 px-4 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-lg bg-[#171D28] text-slate-200"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="website"
                            className="mb-1 inline-block cursor-pointer text-sm text-blur"
                          >
                            Website
                          </label>
                          <input
                            id="website"
                            type="text"
                            name="website"
                            value={inputs.website}
                            placeholder="https://example.com"
                            className="p-2 px-4 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-lg bg-[#171D28] text-slate-200"
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="note"
                            className="mb-1 inline-block cursor-pointer text-sm text-blur"
                          >
                            Note
                          </label>
                          <input
                            id="note"
                            type="text"
                            name="note"
                            value={inputs.note}
                            placeholder="Notes"
                            className="p-2 px-4 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-lg bg-[#171D28] text-slate-200"
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="value"
                            className="mb-1 inline-block cursor-pointer text-sm text-blur"
                          >
                            Value
                          </label>
                          <div className="flex">
                            <input
                              id="value"
                              type={`${hidden ? "password" : "text"}`}
                              name="value"
                              value={value}
                              onChange={handleChangeValue}
                              placeholder="Value"
                              className="p-2 px-4 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-l-lg bg-[#171D28] text-slate-200"
                            />
                            {hidden ? (
                              <div
                                onClick={() => setHidden(!hidden)}
                                className="flex justify-center items-center px-2 border border-l-0 border-slate-500 hover:bg-slate-700 cursor-pointer"
                              >
                                <AiFillEye className="h-7 w-7" />
                              </div>
                            ) : (
                              <div
                                onClick={() => setHidden(!hidden)}
                                className="flex justify-center items-center px-2 border border-l-0 border-slate-500 hover:bg-slate-700 cursor-pointer"
                              >
                                <AiFillEyeInvisible className="h-7 w-7" />
                              </div>
                            )}
                            <div
                              onClick={() => {
                                navigator.clipboard.writeText(value);
                                toast.info("Copied to clipboard", {
                                  autoClose: 1000,
                                  closeOnClick: true,
                                  theme: "dark",
                                });
                              }}
                              className="flex justify-center items-center px-2 border border-l-0 border-slate-500 hover:bg-slate-700 cursor-pointer rounded-r-lg"
                            >
                              <BiCopy className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {password?.created_at && (
                        <p className="text-blur flex items-center mt-4">
                          <BiTimeFive className="h-5 w-5 mr-1" />
                          Created at:{" "}
                          {new Intl.DateTimeFormat("vi-VN", {
                            timeStyle: "medium",
                            dateStyle: "short",
                          }).format(new Date(password.created_at))}
                        </p>
                      )}

                      {errMsg && (
                        <div className="text-red-500 self-start mt-3">
                          {errMsg}
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <button
                          type="submit"
                          className={`py-2 px-6 font-medium bg-red-500 text-slate-200 rounded-xl self-start transition-all ${
                            (isSubmitting || !isNewForm) &&
                            "opacity-50 cursor-not-allowed"
                          }`}
                          disabled={isSubmitting || !isNewForm}
                        >
                          {isSubmitting ? "Updating..." : "Update"}
                        </button>
                        <div
                          onClick={() => setDeleteModal(true)}
                          className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer"
                        >
                          <BiTrash className="w-6 h-6 text-red-400" />
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <ConfirmDeleteModal
            isOpen={deleteModal}
            closeModal={() => setDeleteModal(false)}
            closeDetailModal={closeModal}
            name={password?.name}
          />
        </Dialog>
      </Transition>
    </>
  );
}
