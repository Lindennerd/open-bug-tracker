/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const editCommentSchema = z.object({
  id: z.number(),
  body: z.string(),
});

export const editComment = protectedProcedure
  .input(editCommentSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.bugComment.update({
      where: {
        id: input.id,
        AND: [
          {
            createdBy: {
              id: ctx.session.user.id,
            },
          },
        ],
      },
      data: {
        body: input.body,
      },
    });
  });
