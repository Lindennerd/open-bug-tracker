import { createTRPCRouter } from "../../trpc";
import { addProject } from "./procedures/add";
import { editProject } from "./procedures/edit";
import { getProjects } from "./procedures/get";
import { getProjectById } from "./procedures/getById";

export const projectRouter = createTRPCRouter({
  addProject,
  editProject,
  getProjectById,
  getProjects,
});
