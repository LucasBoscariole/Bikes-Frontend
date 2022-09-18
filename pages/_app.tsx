import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import NavBar from "../components/Nav/NavBar";
import { Toaster } from "react-hot-toast";
import '../components/interceptor/interceptor'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {" "}
      <Toaster />
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
