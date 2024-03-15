import { Inter } from "next/font/google";
import ReduxProvider from "@/provider/provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agency login - logout ",
  description: "Agency Management Application with Empowering remote Collaboration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Toaster position="top-center" reverseOrder={false} />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}