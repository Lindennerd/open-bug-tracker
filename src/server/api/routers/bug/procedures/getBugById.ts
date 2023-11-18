/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const getBugById = publicProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    return await ctx.db.bug.findUnique({
      where: {
        id: input,
      },
      include: {
        createdBy: true,
        reactions: true,
        _count: {
          select: {
            BugComment: true,
          },
        },
      },
    });
  });
