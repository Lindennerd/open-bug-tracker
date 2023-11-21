/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import LoadingBar from "~/components/base/LoadingBar";
import { ProjectForm } from "~/components/project/Form";
import { api } from "~/utils/api";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { data: project } = api.project.getProjectById.useQuery(Number(id));

  if (!project) return <LoadingBar />;

  return (
    <>
      <Head>
        <title>{`Editting project ${project.name ?? ""}`}</title>
      </Head>
      <ProjectForm
        project={{
          id: project.id,
          name: project.name,
          repository: project.repo ?? "",
          description: project.description ?? "",
        }}
        onSubmitted={(project) => router.push(`/project/${project.id}/details`)}
      />
    </>
  );
}
