import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
  userLikeProduct: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.id) {
        throw new Error("User ID is undefined");
      }
    }),

  //   await ctx.db.like.create({
  //     data: {
  //       // Connect the Like to the user who is currently logged in
  //       user: { connect: { id: ctx.session.user.id } },
  //       // Connect the Like to the product specified in the input
  //       product: { connect: { id: input.productId } },
  //     },
  //   });

  //   // Increment the likesCount field of the product
  //   const updatedProduct = await ctx.db.product.update({
  //     where: { id: input.productId },
  //     data: {
  //       likesCount: {
  //         increment: 1,
  //       },
  //     },
  //   });

  //   return { likesCount: updatedProduct.likesCount };
  // }),
  create: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.id) {
        throw new Error("User ID is undefined");
      }
    }),
  toggleLike: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input: { productId } }) => {
      const data = { productId: productId, userId: ctx.session.user.id };
      const existingLike = await ctx.db.like.findUnique({
        where: { productId: data.productId, userId: data.userId },
      });
      if (existingLike == null) {
        await ctx.db.like.create({
          data,
        });
        return { addedLike: true };
      } else {
        await ctx.db.like.delete({
          where: { productId: data.productId, userId: data.userId },
        });
        return { addedLike: false };
      }
    }),
});

// Increment the likesCount field of the product

// userUnlikeProduct: protectedProcedure
//   .input(z.object({ productId: z.string() }))
//   .mutation(async ({ ctx, input }) => {
//     const like = await ctx.db.like.delete({
//       where: {
//         productId: input.productId,
//         userId: ctx.session.user.id,
//       },
//     });

//     return like;
//   }),
