import { Outfit } from "next/font/google";
import "./globals.css";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";
import Head from "next/head";
const outfit = Outfit({ subsets: ["latin"] });



export const metadata = {
  title: "Virtual Question Bank - Engage,Educate and Elevate your mind.",
  description: "Unlock your Potential with every Question.",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8622346357576754"
          crossOrigin="anonymous"
        ></script>
      </Head>

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
