import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
  toggleLike: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const { id: userId } = ctx.session.user;

      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const existingLike = await ctx.db.like.findUnique({
        where: { productId, userId },
      });

      // if (existingLike == null) {
      //   await ctx.db.like.create({
      //     data: { productId, userId },
      //   });
      //   return { addedLike: true };
      // } else {
      //   await ctx.db.like.delete({
      //     where: { productId, userId },
      //   });
      //   return { addedLike: false };
      // }
      if (existingLike == null) {
        await ctx.db.like.create({
          data: { productId, userId },
        });

        // Increment the likesCount of the product
        await ctx.db.product.update({
          where: { id: productId },
          data: {
            likesCount: {
              increment: 1,
            },
          },
        });

        return { addedLike: true };
      } else {
        await ctx.db.like.delete({
          where: { productId, userId },
        });

        // You might also want to decrement the likesCount here
        // if you want to keep the likesCount accurate
        await ctx.db.product.update({
          where: { id: productId },
          data: {
            likesCount: {
              decrement: 1,
            },
          },
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
