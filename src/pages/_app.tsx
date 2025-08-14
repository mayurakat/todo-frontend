import AuthGuard from "@/components/AuthGuard";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  );
}

