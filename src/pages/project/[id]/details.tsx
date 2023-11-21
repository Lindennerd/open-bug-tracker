/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { api } from "~/utils/api";

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: project } = api.project.getProjectById.useQuery(
    Number(params.id ?? 0),
  );

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1>{project?.name}</h1>
          <p>{project?.description}</p>
        </div>
      </Suspense>
    </>
  );
}
