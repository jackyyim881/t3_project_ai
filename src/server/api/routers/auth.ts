import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new Error("Not authenticated");
    }

    return ctx.session.user;
  }),

  setRoleAsAdmin: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          role: "ADMIN",
        },
      });

      return user;
    }),

  setRoleAsUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          role: "USER",
        },
      });

      return user;
    }),
});
