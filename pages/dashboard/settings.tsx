import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import SideBar from "@/components/dashboard/SideBar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";

export default function Dashboard() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [errMsg, setErrMsg] = useState("");
  const [isNewForm, setIsNewForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const { authenticated, validating, loading, user } = useAuth();
  if (!authenticated && !validating && !loading) router.push("/");

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
      let apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
      if (process.env.NODE_ENV === "production") {
        apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;
      }
      console.log(user.id);
      console.log(inputs);
      await axios.put(`${apiUrl}/users/update/${user.id}`, inputs, {
        withCredentials: true,
      });
      mutate("/api/auth");
      toast.success("Updated successfully", {
        autoClose: 1200,
        closeOnClick: true,
        theme: "dark",
      });
      setIsSubmitting(false);
    } catch (err: any) {
      setIsSubmitting(false);
      if (err?.response?.data) {
        toast.error(err.response.data, {
          autoClose: 1200,
          closeOnClick: true,
          theme: "dark",
        });
      } else {
        toast.error("An error occured, please try again", {
          autoClose: 1200,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    if (!user) return;
    if (inputs.name !== user.name || inputs.email !== user.email) {
      setIsNewForm(true);
      return;
    }
    setIsNewForm(false);
  }, [inputs, user]);

  useEffect(() => {
    if (!user) return;
    setInputs({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  useEffect(() => {
    setIsNewForm(false);
    setErrMsg("");
  }, []);

  return (
    <div className="flex min-h-[60vh]">
      <SideBar />
      <div className="grow">
        <div className="flex justify-between items-center">
          <h3 className="text-4xl font-medium leading-none">
            Profile Information
          </h3>
        </div>

        {loading && (
          <div className="h-2/3 flex items-center justify-center">
            <AiOutlineLoading3Quarters className="w-20 h-20 animate-spin text-slate-400" />
          </div>
        )}
        <div className="mt-5">
          <form onSubmit={handleSubmit} className="">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="username"
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
                  htmlFor="email"
                  className="mb-1 inline-block cursor-pointer text-sm text-blur"
                >
                  email
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={inputs.email}
                  required
                  placeholder="Email"
                  className="p-2 px-4 w-full border border-slate-500 focus:border-pink transition-all duration-200 outline-none rounded-lg bg-[#171D28] text-slate-200"
                  onChange={handleChange}
                />
              </div>
            </div>
            {errMsg && (
              <div className="text-red-500 self-start mt-3">{errMsg}</div>
            )}
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className={`py-2 px-6 font-medium bg-red-500 text-slate-200 rounded-lg self-start transition-all ${
                  (isSubmitting || !isNewForm) &&
                  "opacity-50 cursor-not-allowed"
                }`}
                disabled={isSubmitting || !isNewForm}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies.user_session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
