import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen overflow-hidden bg-gradient-to-b from-slate-800 to-gray-800 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
