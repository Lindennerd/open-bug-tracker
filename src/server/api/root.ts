import { createTRPCRouter } from "~/server/api/trpc";
import { bugRouter } from "./routers/bug";
import { bugCommentRouter } from "./routers/comment";
import { projectRouter } from "./routers/project";
import { reactionRouter } from "./routers/reaction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  bug: bugRouter,
  bugComment: bugCommentRouter,
  reaction: reactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
