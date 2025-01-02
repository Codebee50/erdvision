import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ShuffleLoader from "../ShuffleLoader";
import PageLoader from "../PageLoader";

const AuthProtected = ({ children }) => {
  const { userInfo, isAuthenticated} = useSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push(`/auth/login?next=${pathname}`);
    }
  }, [isAuthenticated, hydrated]);

  if (!hydrated) {
    return(
    <section className="w-full h-screen flex items-center justify-center">
      <PageLoader loaderSize={60}/>
    </section>);
  }

  return <>{children}</>;
};

export default AuthProtected;
