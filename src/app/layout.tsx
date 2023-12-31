import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/UI/Navigation/Navigation";
import Provider from "../context/client-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Provider>
          {children}
          <Navigation />
        </Provider>
      </body>
    </html>
  );
}
