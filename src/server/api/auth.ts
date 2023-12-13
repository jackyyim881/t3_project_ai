// import type { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { RoleAdmin } from "~/app/_components/AdminButton";

import { env } from "~/env";
import { db } from "~/server/db";
import { api } from "~/trpc/server";
import { UserRole } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
  // interface User {
  //   isAdmin: boolean;
  //   isUser: boolean;
  //   // ...other properties
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      // get API role from user prisma model
      // const userWithRole = api.auth.getSession.query({
      //   where: { id: user.id },
      //   select: { role: true },
      // });
      // if (userWithRole?.role === UserRole.ADMIN) {
      //   console.log("The user is an admin");
      // } else if (userWithRole?.role === UserRole.USER) {
      //   console.log("The user is a regular user");
      // } else {
      //   console.log("The user role is unknown");
      // }

      return {
        ...session,

        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);