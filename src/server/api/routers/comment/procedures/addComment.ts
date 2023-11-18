/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const addCommentSchema = z.object({
  bugId: z.number(),
  body: z.string(),
});

export const addComment = protectedProcedure
  .input(addCommentSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.bugComment.create({
      data: {
        body: input.body,
        bug: {
          connect: {
            id: input.bugId,
          },
        },
        createdBy: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  });
