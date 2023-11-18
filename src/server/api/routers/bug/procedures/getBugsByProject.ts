/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type BugStatus } from "@prisma/client";
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

const POSSIBLE_STATUSES = ["OPEN", "CLOSED", "IN_PROGRESS", "STALE"] as const;

export const getBugsByProjectSchema = z.object({
  projectId: z.number(),
  status: z
    .array(
      z.string().refine((data) => POSSIBLE_STATUSES.some((s) => s === data)),
    )
    .default(["OPEN"]),
  pagination: z
    .object({
      skip: z.number().optional(),
      take: z.number().optional(),
    })
    .optional(),
});

export const getBugsByProject = publicProcedure
  .input(getBugsByProjectSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.bug.findMany({
      where: {
        projectId: input.projectId,
        AND: {
          status: {
            in: input.status as unknown as BugStatus[],
          },
        },
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
      orderBy: {
        createdAt: "desc",
      },
      skip: input.pagination?.skip ?? 0,
      take: input.pagination?.take ?? 10,
    });
  });
