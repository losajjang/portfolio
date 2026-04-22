import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import clsx from "clsx";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const BASE_PATH = "/portfolio";

export const metadata: Metadata = {
  title: "박재민 포트폴리오",
  description: "프론트엔드 개발자 박재민의 포트폴리오 웹사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} scroll-smooth`}>
      <head>
        <link rel="manifest" href={`${BASE_PATH}/manifest.json`} />
        <link rel="shortcut icon" href={`${BASE_PATH}/favicon.ico`} />
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
        <link
          rel="icon"
          href={`${BASE_PATH}/favicon-16x16.png`}
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href={`${BASE_PATH}/favicon-32x32.png`}
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href={`${BASE_PATH}/favicon-96x96.png`}
          sizes="96x96"
          type="image/png"
        />
        <link rel="apple-touch-icon" href={`${BASE_PATH}/apple-icon.png`} />
        <link
          rel="apple-touch-icon"
          href={`${BASE_PATH}/apple-icon-180x180.png`}
          sizes="180x180"
          type="image/png"
        />
      </head>
      <body className={pretendard.className}>
        <section className={clsx("h-full")}>{children}</section>
        <div id="modal-root" />
      </body>
    </html>
  );
}
