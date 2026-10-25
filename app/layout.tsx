import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/lib/AuthContext'



export const metadata: Metadata = {
  title: "TMD Driving School",
  description: "Professional, reliable and affordable driving lessons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      >
     <body className="min-h-full flex flex-col">
     <AuthProvider>	  
	    <Navbar />
	       <main className="flex-1">
	         {children}
			</main>
	     <Footer />
		</AuthProvider> 
	   </body>
    </html>
  );
}
