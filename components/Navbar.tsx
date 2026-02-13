"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login", redirect: true });
  };

  return (
    <nav className="bg-white border-b-4 border-black px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black text-white bg-[rgb(13,177,130)] border-2 border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase">
          ASTRUM
        </Link>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-[10px] font-black uppercase text-black">
                {session.user?.name}
              </span>
              <div className="h-9 w-9 border-2 border-black relative bg-gray-100">
                <Image
                  src={session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name}&background=0DB182&color=fff&rounded=false`}
                  alt="Avatar" fill className="object-cover"
                />
              </div>
              <button 
                onClick={handleLogout}
                className="text-[10px] font-black text-black border-2 border-black px-3 py-1 hover:bg-black hover:text-white uppercase transition-all"
              >
                Chiqish
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-black text-white px-4 py-2 text-[10px] font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(13,177,130,1)] uppercase">
              Login →
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}