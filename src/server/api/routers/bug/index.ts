import { createTRPCRouter } from "~/server/api/trpc";
import { getBugById } from "./procedures/getBugById";
import { getBugsByProject } from "./procedures/getBugsByProject";
import { reportBug } from "./procedures/reportBug";
import { updateBug } from "./procedures/updateBug";
export const bugRouter = createTRPCRouter({
  getBugById,
  getBugsByProject,
  reportBug,
  updateBug,
});
