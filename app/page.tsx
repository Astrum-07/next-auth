"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-6 bg-white">
      {/* Asosiy Kontener */}
      <div className="w-full max-w-[700px] border-4 border-black p-10 sm:p-16 bg-white shadow-[20px_20px_0px_0px_rgba(13,177,130,1)]">
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-block bg-black text-white px-4 py-1 text-[12px] font-black uppercase italic mb-6 tracking-widest">
            Next.js + NextAuth Tizimi
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-black uppercase italic leading-[0.9] tracking-tighter mb-6">
            ASTRUM-GA <br />
            <span className="text-[rgb(13,177,130)]">XUSH KELIBSIZ!</span>
          </h1>
          <p className="text-xl font-bold text-black border-l-4 border-[rgb(13,177,130)] pl-4 max-w-md uppercase tracking-tight">
            Bu TypeScript va Tailwind CSS bilan yaratilgan professional login tizimi.
          </p>
        </div>

        {/* Tugmalar qismi */}
        <div className="flex flex-col sm:flex-row gap-6">
          {status === "loading" ? (
            <div className="font-black uppercase italic animate-pulse">Yuklanmoqda...</div>
          ) : session ? (
            <Link 
              href="/dashboard"
              className="bg-[rgb(13,177,130)] text-white border-2 border-black px-10 py-5 font-black text-xl uppercase italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all text-center"
            >
              Dashboardga o'tish →
            </Link>
          ) : (
            <>
              <Link 
                href="/login"
                className="bg-[rgb(13,177,130)] text-white border-2 border-black px-10 py-5 font-black text-xl uppercase italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all text-center"
              >
                Kirish (Login)
              </Link>
              <button 
                className="bg-white text-black border-2 border-black px-10 py-5 font-black text-xl uppercase italic shadow-[6px_6px_0px_0px_rgba(13,177,130,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all text-center"
              >
                Ro'yxatdan o'tish
              </button>
            </>
          )}
        </div>

        {/* Pastki yozuv */}
        <div className="mt-12 pt-6 border-t-2 border-black flex justify-between items-center opacity-40">
            <span className="text-[10px] font-black uppercase tracking-widest">v1.0.4 Stable</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[rgb(13,177,130)]">Secure Connection</span>
        </div>
      </div>
    </div>
  );
}