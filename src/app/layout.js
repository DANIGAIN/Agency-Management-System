import { Inter } from "next/font/google";
import ReduxProvider from "@/provider/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agency login - logout ",
  description: "Agency Management Application with Empowering remote Collaboration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}