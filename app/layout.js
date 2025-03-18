import { Outfit } from "next/font/google";
import "./globals.css";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";
const outfit = Outfit({ subsets: ["latin"] });



export const metadata = {
  title: "Virtual Question Bank - Engage,Educate and Elevate your mind.",
  description: "Unlock your Potential with every Question.",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={outfit.className}>
        <header>
          <Nav />
        </header>
        {children}

        <Footer />
      </body>
    </html>
  );
}
