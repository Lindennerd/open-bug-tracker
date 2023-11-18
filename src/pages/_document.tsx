import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen overflow-hidden bg-gradient-to-b from-purple-700 to-gray-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
