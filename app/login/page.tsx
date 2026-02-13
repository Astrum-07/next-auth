"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { username, password, redirect: false });
    if (res?.error) {
      alert("Xato! Username: emilys / Parol: emilyspass");
      setLoading(false);
    } else router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-[400px] border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(13,177,130,1)]">
        
        <div className="mb-8">
          <h1 className="text-4xl font-black text-black uppercase tracking-tighter italic">KIRISH</h1>
          <p className="text-[rgb(13,177,130)] font-black text-sm mt-1 uppercase underline decoration-2">Backend: DummyJSON</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-black uppercase mb-1">Username</label>
            <input
              type="text" placeholder="emilys" required
              className="w-full px-4 py-3 border-2 border-black text-black font-bold outline-none focus:bg-[rgb(13,177,130)]/10"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-black uppercase mb-1">Parol</label>
            <input
              type="password" placeholder="emilyspass" required
              className="w-full px-4 py-3 border-2 border-black text-black font-bold outline-none focus:bg-[rgb(13,177,130)]/10"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-[rgb(13,177,130)] text-white py-4 font-black text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase"
          >
            {loading ? "YUKLANMOQDA..." : "LOGIN →"}
          </button>
        </form>

        <div className="relative my-8 text-center border-t-2 border-black">
          <span className="relative -top-3 bg-white px-4 text-[10px] font-black text-black uppercase">yoki</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="flex items-center justify-center gap-2 py-3 border-2 border-black font-black text-black hover:bg-gray-100 uppercase text-[10px]">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" height="20" className="w-5 h-5 object-contain" alt="" /> Google
          </button>
          <button onClick={() => signIn("github", { callbackUrl: "/dashboard" })} className="flex items-center justify-center gap-2 py-3 bg-black text-white font-black border-2 border-black uppercase text-[10px]">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" width="20" height="20" className="w-5 h-5 invert object-contain" alt="" /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}