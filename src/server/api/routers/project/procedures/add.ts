/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const addProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  repository: z.string().url(),
});

export type AddProjectInput = z.infer<typeof addProjectSchema>;

export const addProject = protectedProcedure
  .input(addProjectSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.project.create({
      data: {
        name: input.name,
        description: input.description,
        repo: input.repository,
        createdBy: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  });
