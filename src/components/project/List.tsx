/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "../base";
import { Check } from "../base/Check";
import LoadingSkeleton from "../base/LoadingSkeleton";
import { ProjectListItem } from "./ProjectListItem";
import { SearchProject } from "./SearchProject";

export type ProjectListProps = {
  name?: string;
  myProjects?: boolean;
  limit?: number;
};

export const ProjectList = () => {
  const [filter, setFilter] = useState({
    myProjects: false,
    name: "",
    limit: 10,
  });
  const {
    data: pages,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    fetchNextPage,
  } = api.project.getProjects.useInfiniteQuery(
    {
      myProjects: filter.myProjects,
      name: filter.name,
      limit: filter.limit,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  return (
    <>
      {isLoading && <LoadingSkeleton />}
      {pages?.pages.map((projectsPage, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <Check
              label={filter.myProjects ? "My Projects" : "All Projects"}
              checked={filter.myProjects}
              onChecked={(checked) =>
                setFilter({ ...filter, myProjects: checked })
              }
            />

            <SearchProject
              currentSearch={filter.name}
              onSearch={(name) => setFilter({ ...filter, name })}
            />
          </div>
          {projectsPage.projects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      ))}
      <div className="flex w-full gap-4 py-2">
        <Button
          full
          disabled={!hasPreviousPage}
          onClick={() => fetchPreviousPage()}
        >
          Previous
        </Button>
        <Button
          full
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};
