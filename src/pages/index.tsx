import Head from "next/head";
import { ProjectList } from "~/components/project/List";

export default function Home() {
  return (
    <>
      <Head>
        <title>Open Bug Tracker</title>
        <meta name="description" content="Open Bug Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col">
        <ProjectList />
      </div>
    </>
  );
}
