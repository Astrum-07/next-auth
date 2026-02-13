import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    GithubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
    CredentialsProvider({
      name: "DummyJSON",
      credentials: { username: { type: "text" }, password: { type: "password" } },
      async authorize(credentials) {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const user = await res.json();
        if (res.ok && user) {
          return { id: user.id, name: user.firstName + " " + user.lastName, email: user.email, image: user.image };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) token.user = user; return token; },
    async session({ session, token }) { session.user = token.user as any; return session; },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };