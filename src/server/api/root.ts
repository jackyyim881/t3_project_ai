import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from "./routers/product";
import { authRouter } from "./routers/auth";
import { likeRouter } from "./routers/like";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  product: productRouter,
  auth: authRouter,
  like: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
