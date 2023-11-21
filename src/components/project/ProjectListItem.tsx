import Link from "next/link";
import { useRouter } from "next/router";
import { type GetProjectsOutput } from "~/server/api/routers/project/procedures/get";
import { Button } from "../base";
import { Edit } from "../base/icons";

export const ProjectListItem = ({
  project,
}: {
  project: GetProjectsOutput;
}) => {
  const router = useRouter();

  return (
    <div className="rounded-sm border-2 border-gray-600 bg-gray-700 p-2">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="flex items-center gap-2">
            <Link
              className=" font-semibold hover:underline"
              target="_blank"
              href={project.repo ?? `/project/${project.id}/details`}
            >
              {project.name}
            </Link>
            {project.canEdit && (
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => router.push(`/project/${project.id}/edit`)}
              >
                <Edit className="w-5 " />
              </button>
            )}
          </h1>
          <p>
            Bugs reported
            <span className="ml-2 rounded-md bg-yellow-400 p-1 text-black">
              {project._count.bugs}
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <p className="text-sm text-gray-400">
            Created at: {project.createdAt.toLocaleDateString()}
          </p>
          <Button>Report a bug</Button>
        </div>
      </div>
    </div>
  );
};
