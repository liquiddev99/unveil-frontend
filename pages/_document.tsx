import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Unveil</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="bg-[#1A202D]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
