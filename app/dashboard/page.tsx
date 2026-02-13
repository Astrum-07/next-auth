"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Himoya: Login qilmagan bo'lsa, qaytarib yuborish
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-black italic text-2xl uppercase italic">
        Yuklanmoqda...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 flex items-center justify-center">
      {/* Asosiy Dashboard Card */}
      <div className="w-full max-w-[600px] border-4 border-black bg-white p-6 sm:p-10 shadow-[16px_16px_0px_0px_rgba(13,177,130,1)]">
        
        {/* Header qismi */}
        <div className="mb-10 border-b-4 border-black pb-6">
          <div className="inline-block bg-black text-white px-4 py-1 text-[11px] font-black uppercase italic mb-4">
            User Dashboard
          </div>
          <h1 className="text-5xl font-black text-black uppercase italic leading-none tracking-tighter">
            {session.user?.name}
          </h1>
          <p className="text-[rgb(13,177,130)] font-black text-xl mt-2 underline decoration-4">
            {session.user?.email}
          </p>
        </div>

        {/* Profil va Ma'lumotlar qismi */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
          {/* Rasm - To'rtburchak va qalin ramkali */}
          <div className="relative w-40 h-40 border-4 border-black bg-gray-100 flex-shrink-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src={session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name}&background=0DB182&color=fff&rounded=false`}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>

          {/* Ma'lumotlar gridi */}
          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="border-2 border-black p-4 bg-[rgb(13,177,130)]/5">
              <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Status</p>
              <p className="font-black text-black text-lg italic uppercase">Aktiv Foydalanuvchi</p>
            </div>
            <div className="border-2 border-black p-4 bg-gray-50">
              <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Backend Provider</p>
              <p className="font-black text-black text-lg italic uppercase tracking-tight">DummyJSON API v1.0</p>
            </div>
          </div>
        </div>

        {/* Amallar qismi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-white border-2 border-black py-4 font-black text-sm uppercase hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            Sozlamalar
          </button>
          <button 
            onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
            className="bg-black text-white border-2 border-black py-4 font-black text-sm uppercase hover:bg-[rgb(13,177,130)] transition-all shadow-[4px_4px_0px_0px_rgba(13,177,130,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Chiqish (Logout) →
          </button>
        </div>
      </div>
    </div>
  );
}