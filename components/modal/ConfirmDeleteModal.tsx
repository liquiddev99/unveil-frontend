import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useSWRConfig } from "swr";
import { AiFillWarning } from "react-icons/ai";

interface Props {
  name: string | undefined;
  isOpen: boolean;
  closeModal: () => void;
  closeDetailModal: () => void;
}
export default function ConfirmDeleteModal({
  isOpen,
  closeModal,
  closeDetailModal,
  name,
}: Props) {
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    try {
      setErrMsg("");
      e.preventDefault();
      setIsSubmitting(true);
      await axios.delete(`http://localhost:8080/passwords/delete/${name}`, {
        withCredentials: true,
      });
      mutate("/api/passwords");
      setIsSubmitting(false);
      closeModal();
      closeDetailModal();
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
    if (isOpen) {
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
                <Dialog.Panel className="text-slate-200 w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#1A202D] px-10 py-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-3xl font-medium flex items-center text-center"
                  >
                    <AiFillWarning className="h-8 w-8 mr-4" />
                    <span className="">Confirm Delete</span>
                  </Dialog.Title>

                  <div className="mt-4">
                    <p className="text-blur">
                      Are you sure you want to delete this password?
                    </p>
                    {errMsg && <p className="my-3 text-red-500">{errMsg}</p>}
                    <div className="mt-5">
                      <button
                        onClick={handleDelete}
                        className="px-4 py-1.5 border border-red-500 bg-red-500 rounded-md mr-4 hover:opacity-90 outline-none"
                      >
                        {isSubmitting ? "Deleting..." : "Delete"}
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-4 py-1.5 border border-red-500 rounded-md hover:bg-slate-700 outline-none"
                      >
                        Cancel
                      </button>
                    </div>
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
