import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
  userlikeProduct: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const like = await ctx.db.like.create({
        data: {
          productId: input.productId,
          userId: ctx.session.user.id,
        },
      });
      return like;
    }),

  userUnlikeProduct: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const like = await ctx.db.like.delete({
        where: {
          productId: input.productId,
          userId: ctx.session.user.id,
        },
      });

      return like;
    }),
});
