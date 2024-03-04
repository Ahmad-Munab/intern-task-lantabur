import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task for Lantabur Softech",
  description: "Task for Lantabur Softech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col max-h-screen max-w-screen overflow-x-hidden bg-background`}
      >
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
