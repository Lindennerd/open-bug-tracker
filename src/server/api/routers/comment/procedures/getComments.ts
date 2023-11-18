/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const getCommentsSchema = z.object({
  bugId: z.number(),
  pagination: z.object({
    take: z.number(),
    skip: z.number(),
  }),
});

export const getComments = publicProcedure
  .input(getCommentsSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.bugComment.findMany({
      where: {
        bugId: input.bugId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: input.pagination.take,
      skip: input.pagination.skip,
      include: {
        CommentReactions: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  });
