import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "../components/header/header";

import Providers from "./providers";
import CartProvider from "@/contexts/cart-context";
import AuthProvider from "@/contexts/auth-context";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KBDFans",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${inter.className} overflow-y-scroll relative`}>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
