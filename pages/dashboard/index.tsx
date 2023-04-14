import { useState } from "react";
import { GetServerSideProps } from "next";
import { useAuth } from "@/hooks/auth";
import { usePasswords } from "@/hooks/password";
import { useRouter } from "next/router";
import { AiOutlinePlus, AiOutlineLoading3Quarters } from "react-icons/ai";

import SideBar from "@/components/dashboard/SideBar";
import NewPasswordModal from "@/components/modal/NewPasswordModal";
import PasswordItem from "@/components/password/PasswordItem";
import DetailPasswordModal from "@/components/modal/DetailPasswordModal";
import { PasswordItem as IPasswordItem } from "@/types/password";

export default function Dashboard() {
  const router = useRouter();

  const [newPasswordModal, setNewPasswordModal] = useState(false);
  const [detailPasswordModal, setDetailPasswordModal] = useState(false);
  const [password, setPassword] = useState<IPasswordItem>();

  const { authenticated, validating, loading } = useAuth();
  if (!authenticated && !validating && !loading) router.push("/");

  const { passwords, loading: loadingPasswords } = usePasswords();

  return (
    <div className="flex min-h-[60vh]">
      <SideBar />
      <div className="grow">
        <div className="flex justify-between items-center">
          <h3 className="text-4xl font-medium leading-none">Passwords</h3>
          <button
            onClick={() => setNewPasswordModal(true)}
            className="flex items-center border border-slate-700 hover:bg-slate-700 transition-colors rounded px-4 py-1.5"
          >
            <AiOutlinePlus className="w-[1.15rem] h-[1.15rem] mr-2 text-pink" />
            New Password
          </button>
        </div>

        {loadingPasswords && (
          <div className="h-2/3 flex items-center justify-center">
            <AiOutlineLoading3Quarters className="w-20 h-20 animate-spin text-slate-400" />
          </div>
        )}

        {passwords && !passwords.length && (
          <div className="flex justify-center items-center h-1/2">
            <button
              onClick={() => setNewPasswordModal(true)}
              className="flex items-center text-xl border border-slate-700 hover:bg-slate-700 transition-colors rounded px-4 py-1.5"
            >
              <AiOutlinePlus className="w-6 h-6 mr-2 text-pink" />
              New Password
            </button>
          </div>
        )}

        <div className="mt-7 grid grid-cols-3 gap-4">
          {passwords &&
            passwords.length > 0 &&
            passwords.map((password) => (
              <PasswordItem
                password={password}
                openDetail={() => {
                  setPassword(password);
                  setDetailPasswordModal(true);
                }}
                key={password.id}
              />
            ))}
        </div>
      </div>

      <NewPasswordModal
        isOpen={newPasswordModal}
        closeModal={() => setNewPasswordModal(false)}
      />

      <DetailPasswordModal
        isOpen={detailPasswordModal}
        closeModal={() => setDetailPasswordModal(false)}
        password={password}
      />
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
