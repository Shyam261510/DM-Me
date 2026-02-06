import GoogleProvider from "next-auth/providers/google";
import { loginHandler } from "@/helper/loginHandler";
import { getUserInfo } from "@/helper/getUserInfo";

export const NEXT_AUTH = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    updateAge: 30 * 60, // session for 30 min
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ user }: any) {
      try {
        const { email, name } = user;

        // Check if email is provided
        if (!email) {
          console.error("Sign-in error: Email is required.");
          return false;
        }
        const {
          success,
          message,
          user: userInfo,
        } = await loginHandler(email, name);
        if (!success || !userInfo) {
          throw new Error(message || "Invalid credentials");
        }

        // Allow sign-in
        return true;
      } catch (e: any) {
        console.error("Sign-in error:", e.message); // Improved error logging
        return false;
      }
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.image = user.image;
        token.name = user.name;
      }

      // Fetch the user from the database to get the ID
      if (token.email) {
        const {
          success,
          message,
          user: dbUser,
        } = await getUserInfo({ email: token.email });

        if (!success) {
          throw new Error(message);
        }

        if (dbUser) {
          token.id = dbUser.id; // Add the user ID to the JWT token
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        if (token.id) {
          session.user.id = token.id as string;
          session.user.email = token.email as string;
          session.user.image = token.image as string;
          session.user.name = token.name as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
