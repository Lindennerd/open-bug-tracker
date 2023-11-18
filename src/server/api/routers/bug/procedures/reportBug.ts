/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const reportBugSchema = z.object({
  projectId: z.number(),
  title: z.string(),
  body: z.string(),
});

export type ReportBugInput = z.infer<typeof reportBugSchema>;

export const reportBug = protectedProcedure
  .input(reportBugSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.bug.create({
      data: {
        title: input.title,
        body: input.body,
        createdBy: {
          connect: {
            id: ctx.session.user.id,
          },
        },
        project: {
          connect: {
            id: input.projectId,
          },
        },
      },
    });
  });
