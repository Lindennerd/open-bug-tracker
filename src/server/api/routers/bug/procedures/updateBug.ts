/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const updateBugSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  body: z.string().optional(),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS", "STALE"]).optional(),
});

export const updateBug = protectedProcedure
  .input(updateBugSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.bug.update({
      where: {
        id: input.id,
        AND: [
          {
            OR: [
              { createdBy: { id: ctx.session.user.id } },
              {
                project: {
                  members: { some: { user: { id: ctx.session.user.id } } },
                },
              },
            ],
          },
        ],
      },
      data: {
        title: input.title,
        body: input.body,
        status: input.status,
      },
    });
  });
