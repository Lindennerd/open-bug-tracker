import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Open Bug Tracker</title>
        <meta name="description" content="Open Bug Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href="/project/new">bring your project</Link>
      </div>
    </>
  );
}
