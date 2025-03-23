import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/UI/Navigation/Navigation";
import Provider from "../context/client-provider";
import QueryProvider from "../context/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className + " bg-[#040506]"}>
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
