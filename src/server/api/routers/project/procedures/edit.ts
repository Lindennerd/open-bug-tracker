/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const editProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  repository: z.string().url(),
});

export type EditProjectInput = z.infer<typeof editProjectSchema>;

export const editProject = protectedProcedure
  .input(editProjectSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.project.update({
      where: {
        id: input.id,
        AND: [{ createdBy: { id: ctx.session.user.id } }],
      },
      data: {
        name: input.name,
        description: input.description,
        repo: input.repository,
      },
    });
  });
