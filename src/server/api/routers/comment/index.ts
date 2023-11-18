import { createTRPCRouter } from "~/server/api/trpc";
import { addComment } from "./procedures/addComment";
import { editComment } from "./procedures/editComment";
import { getComments } from "./procedures/getComments";

export const bugCommentRouter = createTRPCRouter({
  addComment,
  editComment,
  getComments,
});
