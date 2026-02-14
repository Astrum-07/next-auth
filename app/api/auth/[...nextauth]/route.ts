import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // 1. Debug rejimi (Xatolarni terminal va loglarda batafsil ko'rsatadi)
  debug: true,

  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "DummyJSON",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.error("Xato: Username yoki parol kiritilmadi");
          return null;
        }

        try {
          console.log("DummyJSON-ga so'rov yuborilmoqda...");
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            console.log("Login muvaffaqiyatli:", user.username);
            return {
              id: user.id.toString(),
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              image: user.image,
            };
          } else {
            console.error("DummyJSON xatosi:", user.message || "Noto'g'ri login/parol");
            return null;
          }
        } catch (error) {
          console.error("Backend fetch xatosi:", error);
          return null;
        }
      },
    }),
  ],

  // 2. Maxsus logger (Vercel Logs-da xatolarni chiroyli chiqaradi)
  logger: {
    error(code, metadata) {
      console.error("NEXTAUTH_ERROR_CODE:", code);
      console.error("NEXTAUTH_METADATA:", metadata);
    },
    warn(code) {
      console.warn("NEXTAUTH_WARNING:", code);
    },
    debug(code, metadata) {
      console.log("NEXTAUTH_DEBUG:", code, metadata);
    },
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // Xato bo'lganda login sahifasiga qaytadi va URL-da ?error= xabarini chiqaradi
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };