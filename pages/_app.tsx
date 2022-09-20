import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import NavBar from "../components/Nav/NavBar";
import { Toaster } from "react-hot-toast";
import "../components/interceptor/interceptor";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bikes Rental | Lucas Boscariole Silva</title>
      </Head>
      <Toaster />
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);

