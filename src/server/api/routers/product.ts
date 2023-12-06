import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), price: z.number().positive() }))
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = ctx.db.product.create({
        data: {
          name: input.name,
          price: input.price,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
      return product;
    }),

  getLatestProduct: protectedProcedure.query(({ ctx }) => {
    return ctx.db.product.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany();
  }),
});
