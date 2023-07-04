import { Inter } from "next/font/google"
import ChakraProvider from "./ChakraProvider"
import ReactQueryProvider from "@/utils/ReactQueryProvider"
import Footer from "./components/Footer"
import Header from "./components/Header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={` ${inter.className} overflow-y-scroll relative`}>
        <ChakraProvider>
          <ReactQueryProvider>
            <Header />
            {children}
            <Footer />
          </ReactQueryProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
