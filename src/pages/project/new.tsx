/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Head from "next/head";
import { useRouter } from "next/router";
import { ProjectForm } from "~/components/project/Form";

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>New Project</title>
      </Head>
      <ProjectForm
        onSubmitted={(project) => router.push(`/project/${project.id}`)}
      />
    </>
  );
}
