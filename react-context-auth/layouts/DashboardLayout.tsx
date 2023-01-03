import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

import { useAuthContext } from "@contexts";

import { Sidebar, SidebarMenu, UserInfo } from "@components/sections";
import { LoadingScreen } from "@components";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<Props> = ({ children, title }) => {
  const router = useRouter();

  const { isLoggedIn, checking, user } = useAuthContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (checking) {
    return <LoadingScreen />;
  }

  if (!checking && !isLoggedIn) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <>
      <Head>
        <title>Alfred CMS Wallet</title>
      </Head>
      <SidebarMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Sidebar />

      <div className="flex flex-col md:pl-56 2xl:pl-64">
        <div className="sticky top-0 z-10 flex h-16 md:h-20 flex-shrink-0 bg-white dark:bg-black">
          <button
            type="button"
            className="border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-200 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 justify-between px-4 sm:px-6 md:px-8 xl:px-10">
            {title && (
              <div className="flex items-center">
                <div className="text-xs md:text-sm font-bold text-primary line-clamp-2">
                  {title}
                </div>
              </div>
            )}

            <div className="flex items-center flex-1"></div>

            <div className="ml-4 flex items-center md:ml-6">
              <UserInfo
                name={user?.fullname ?? ""}
                role={user?.role ?? ""}
                image={user?.avatarUri ?? ""}
              />
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="px-4 sm:px-6 md:px-8 xl:px-10">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
