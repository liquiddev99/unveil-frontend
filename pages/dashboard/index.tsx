import { useState } from "react";
import { GetServerSideProps } from "next";
import { useAuth } from "@/hooks/auth";
import { usePasswords } from "@/hooks/password";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";

import SideBar from "@/components/dashboard/SideBar";
import NewPasswordModal from "@/components/modal/NewPasswordModal";

export default function Dashboard() {
  const router = useRouter();

  const [newPasswordModal, setNewPasswordModal] = useState(false);

  const { authenticated, validating, loading } = useAuth();
  if (!authenticated && !validating && !loading) router.push("/");

  const { passwords } = usePasswords();

  console.log("passwords", passwords);

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

        <div className="mt-4">
          {passwords &&
            passwords.length &&
            passwords.map((password) => (
              <div key={password.id}>{password.name}</div>
            ))}
        </div>
      </div>

      <NewPasswordModal
        isOpen={newPasswordModal}
        closeModal={() => setNewPasswordModal(false)}
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
