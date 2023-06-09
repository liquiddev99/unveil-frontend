import Layout from "@/components/layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer transition={Slide} hideProgressBar={true} />
    </Layout>
  );
}
