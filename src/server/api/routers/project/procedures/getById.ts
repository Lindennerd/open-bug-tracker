/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export type GetProjectByIdOutput = ReturnType<typeof getProjectById>;

export const getProjectById = publicProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    return await ctx.db.project.findUnique({
      include: {
        createdBy: true,
        members: true,
        _count: {
          select: {
            bugs: {
              where: {
                status: "OPEN",
              },
            },
          },
        },
      },
      where: {
        id: input,
      },
    });
  });
