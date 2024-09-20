import type { Metadata } from "next";
import { Baloo_Chettan_2, Inter } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from "./providers";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ResponseInterceptor from "@/utils/Axios/interceptor";


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
      <body className={`h-screen  ${GeistSans.className} `}>
       
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark">
          
            <Toaster position="top-right" richColors={true} toastOptions={{
              className:"font-sans text-md",
              duration:1000,
            }} />
             <ResponseInterceptor />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
