import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { useIsFetching } from "@tanstack/react-query";
import LoadingBar from "~/components/base/LoadingBar";
import { Nav } from "~/components/nav";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const isFetching = useIsFetching();

  return (
    <SessionProvider session={session}>
      {isFetching > 0 && <LoadingBar />}
      <Nav />
      <main className="max-h-screen overflow-auto">
        <section className="mx-auto mb-20 flex max-w-screen-lg flex-row flex-wrap gap-4 rounded-md  p-2">
          <Component {...pageProps} />
        </section>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
