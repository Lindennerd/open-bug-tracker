/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const projectOutput = z.object({
  id: z.number(),
  name: z.string(),
  repo: z.string().nullish(),
  createdAt: z.date(),
  createdBy: z.object({
    id: z.string().nullish(),
    name: z.string().nullish(),
  }),
  members: z.array(
    z.object({
      id: z.number(),
      user: z.object({
        id: z.string().nullish(),
        name: z.string().nullish(),
      }),
    }),
  ),
  _count: z.object({
    bugs: z.number(),
  }),
  canEdit: z.boolean(),
});

export const getProjectsOutput = z.object({
  projects: z.array(projectOutput),
  nextCursor: z.number().nullable(),
});

export const getProjectsSchema = z.object({
  name: z.string().optional(),
  myProjects: z.boolean().optional(),
  cursor: z.number().optional(),
  limit: z.number().optional(),
});

export type GetProjectsInput = z.infer<typeof getProjectsSchema>;
export type GetProjectsOutput = z.infer<typeof projectOutput>;

export const getProjects = publicProcedure
  .input(getProjectsSchema)
  .output(getProjectsOutput)
  .query(async ({ ctx, input }) => {
    const pageSize = input.limit ?? 10;
    const cursor = input.cursor;
    const user = ctx.session?.user;

    const projects = await ctx.db.project.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input.name,
              mode: "insensitive",
            },
          },
          input.myProjects
            ? {
                OR: [
                  { createdById: ctx.session?.user.id },
                  {
                    members: {
                      some: {
                        userId: ctx.session?.user.id,
                      },
                    },
                  },
                ],
              }
            : {},
        ],
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: "asc",
      },
      include: {
        createdBy: true,
        members: {
          select: {
            id: true,
            user: true,
          },
        },
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
    });

    let nextCursor: typeof cursor | null = null;
    if (projects.length > pageSize) {
      const nextItem = projects.pop();
      if (nextItem) {
        nextCursor = nextItem.id;
      }
    }

    const projectsWithCanEdit = projects.map((project) => {
      return {
        ...project,
        canEdit: project.createdById === user?.id,
      };
    });

    return {
      projects: projectsWithCanEdit,
      nextCursor,
    };
  });
