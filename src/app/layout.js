import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import HeaderNav from "@/components/header/Header";
import Background from "@/components/background";
import DarkMode from "@/components/darkMode";
import Fireworks from "@/components/fireworks";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Adkinsm Home",
  description: "Front-end Developer / Open Sourceror / Blogger / Android Player",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" className={inter.className}>
        <body className="bg-white dark:bg-gray-950 dark:text-white">
        <Providers>
          <HeaderNav />
          <Background />
          <DarkMode />
          <Fireworks />
          <div id="root">
            {children}
          </div>
          </Providers>
        </body>
      </html>
  );
}
