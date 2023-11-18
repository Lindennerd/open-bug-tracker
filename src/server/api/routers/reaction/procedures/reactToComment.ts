/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Reactions } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const reactToCommentSchema = z.object({
  commentId: z.number(),
  reaction: z.nativeEnum(Reactions),
});

export const reactToComment = protectedProcedure
  .input(reactToCommentSchema)
  .mutation(async ({ ctx, input }) => {
    const { commentId, reaction } = input;
    const userId = ctx.session.user.id;

    const existingReaction = await ctx.db.commentReaction.findFirst({
      where: {
        bugComment: { id: commentId },
        createdBy: { id: userId },
      },
    });

    if (existingReaction) {
      await ctx.db.commentReaction.delete({
        where: {
          id: existingReaction.id,
        },
      });
    }

    await ctx.db.commentReaction.create({
      data: {
        bugComment: { connect: { id: commentId } },
        createdBy: { connect: { id: userId } },
        reaction,
      },
    });

    return true;
  });
