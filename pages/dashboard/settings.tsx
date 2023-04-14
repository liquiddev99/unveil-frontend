import { GetServerSideProps } from "next";
import { useAuth } from "@/hooks/auth";
import { usePasswords } from "@/hooks/password";
import { useRouter } from "next/router";
import SideBar from "@/components/dashboard/SideBar";

export default function Dashboard() {
  const router = useRouter();
  const { authenticated, validating, loading } = useAuth();
  if (!authenticated && !validating && !loading) router.push("/");

  const { passwords } = usePasswords();

  console.log("passwords", passwords);

  if (!authenticated && loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-[60vh]">
      <SideBar />
      <div>Account</div>
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
