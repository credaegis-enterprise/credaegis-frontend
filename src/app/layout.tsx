import type { Metadata } from "next";
import {Baloo_Chettan_2, Inter, Roboto_Mono} from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { Providers } from "./providers";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ResponseInterceptor from "@/utils/Axios/interceptor";
import type {Viewport} from "next";

const inter = Inter({ subsets: ["latin"] });
const baloo = Baloo_Chettan_2({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Credaegis",
  description: "secure. simple. scalable.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }
        `}</style>
      </head>
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
