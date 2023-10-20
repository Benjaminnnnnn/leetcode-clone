import { Providers } from "@/redux/Provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeetCode Clone",
  description: "This is a LeetCode clone app built with Next.js",
  applicationName: "LeetCode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer></ToastContainer>
          <div id="portal"></div>
        </Providers>
      </body>
    </html>
  );
}
