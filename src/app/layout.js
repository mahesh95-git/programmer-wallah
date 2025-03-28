import { Rubik } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import {
  ClerkProvider,

} from '@clerk/nextjs'
import Footer from "@/components/shared/Footer";

const font = Rubik({ subsets: ['latin'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className}`}>
          <main >
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
