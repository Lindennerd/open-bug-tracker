import { createTRPCRouter } from "~/server/api/trpc";
import { reactToBug } from "./procedures/reactToBug";
import { reactToComment } from "./procedures/reactToComment";

export const reactionRouter = createTRPCRouter({
  reactToBug,
  reactToComment,
});
