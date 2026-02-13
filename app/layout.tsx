import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astrum Auth - Neo Brutalism",
  description: "Next.js + NextAuth + Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning - brauzer kengaytmalari (ColorZilla va h.k.) 
    // tufayli chiqadigan xatolarni to'xtatadi
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white antialiased`}>
        {/* NextAuth sessiyasini butun ilova bo'ylab ishlatish uchun */}
        <Providers>
          {/* Yuqori menyu */}
          <Navbar />
          
          {/* Sahifalar kontenti */}
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}