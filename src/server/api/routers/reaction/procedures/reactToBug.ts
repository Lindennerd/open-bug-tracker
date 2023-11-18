/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Reactions } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const reactToBugSchema = z.object({
  bugId: z.number(),
  reaction: z.nativeEnum(Reactions),
});

export const reactToBug = protectedProcedure
  .input(reactToBugSchema)
  .mutation(async ({ ctx, input }) => {
    const { bugId, reaction } = input;
    const userId = ctx.session.user.id;

    const existingReaction = await ctx.db.bugReaction.findFirst({
      where: {
        bug: { id: bugId },
        createdBy: { id: userId },
      },
    });

    if (existingReaction) {
      await ctx.db.bugReaction.delete({
        where: {
          id: existingReaction.id,
        },
      });
    }

    await ctx.db.bugReaction.create({
      data: {
        bug: { connect: { id: bugId } },
        createdBy: { connect: { id: userId } },
        reaction,
      },
    });

    return true;
  });
