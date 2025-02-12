import { Inter } from "next/font/google";
import "../globals.css";
import Navigation from "../../components/UI/Navigation/Navigation";
import Provider from "../../context/client-provider";
import { auth } from "@/auth"
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const session = await auth()
 
    if (!session) {
      redirect('/signin')
    }

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
