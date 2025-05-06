import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/UI/Navigation/Navigation";
import Provider from "../context/client-provider";
import QueryProvider from "../context/QueryProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MusculeLog",
  description: "Your personal workout log",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#15151A]"}>
        <Provider>
          <QueryProvider>
            {children}
            <Navigation />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
