import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className={`${poppins.className} text-slate-200`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
