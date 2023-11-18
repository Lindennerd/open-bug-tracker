/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const getProjectsSchema = z.object({
  name: z.string().optional(),
  pagination: z
    .object({
      skip: z.number().optional(),
      take: z.number().optional(),
    })
    .optional(),
});

export type GetProjectsInput = z.infer<typeof getProjectsSchema>;
export type GetProjectsOutput = ReturnType<typeof getProjects>;

export const getProjects = publicProcedure
  .input(getProjectsSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.project.findMany({
      where: {
        name: {
          contains: input.name,
        },
      },
      include: {
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
      orderBy: {
        createdAt: "desc",
      },
      skip: input.pagination?.skip ?? 0,
      take: input.pagination?.take ?? 10,
    });
  });
