import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useAuthContext } from "@contexts";
import { LoadingScreen } from "@components";

const Logo = dynamic(() => import("@components/Logo"), { ssr: false });

import alfredLeftBanner from "@public/assets/images/alfred-left-banner.jpg";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, checking } = useAuthContext();
  const router = useRouter();

  if (checking) {
    return <LoadingScreen />;
  }

  if (!checking && isLoggedIn) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Alfred CMS Wallet | Iniciar Sesión</title>
      </Head>
      <div className="h-screen grid grid-cols-5">
        <div className="hidden md:block md:col-span-2">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={alfredLeftBanner}
              alt="Alfred Left Banner"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
        </div>
        <div className="col-span-full md:col-span-3 flex flex-col items-center justify-center">
          <div className="w-11/12 max-w-md">
            <div className="mb-12">
              <Logo className="h-16" />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
