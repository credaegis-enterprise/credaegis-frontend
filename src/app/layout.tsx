import type { Metadata } from "next";
import { Baloo_Chettan_2, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Navbar } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const baloo = Baloo_Chettan_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CredAegis",
  description: "BAsed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="white">
            <Toaster position="top-right" richColors={true} toastOptions={{
              duration:1000,
            }} />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
