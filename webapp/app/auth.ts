import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { verifyPassword } from "@/lib/hash";

interface AuthUser {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const client = await clientPromise;
          const database = client.db("me-dev");
          const authCollection = database.collection<AuthUser>("auth");

          const user = await authCollection.findOne({ email });

          if (!user) {
            throw new Error("Email ou senha inválidos");
          }

          const isValidPassword = await verifyPassword(password, user.password);

          if (!isValidPassword) {
            throw new Error("Email ou senha inválidos");
          }

          return {
            id: user.email,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Email ou senha inválidos");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
