import React from "react";
import LogoText from "@/components/LogoText";
import { navLinks } from "@/constants/constants";
import Link from "next/link";
import { RiMenuLine } from "react-icons/ri";
import UserDropDown from "./UserDropDown";
import { urlConfig } from "@/urls/fe";
import { useSelector } from "react-redux";
import { userLogout } from "@/features/auth/authActions";
import { useState, useEffect } from "react";
import ShuffleLoader from "./ShuffleLoader";

function Nav(props) {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <ShuffleLoader ></ShuffleLoader>;
  }
  return (
    <nav
      className={"w-fu flex flex-row items-center justify-between bg-green01 "}
    >
      <LogoText logoColor={"#7ED6DF"} />

      <div className={"hidden herobr02:flex flex-row items-center gap-8"}>
        {navLinks.map((item) => {
          return (
            <Link
              href={item.link}
              key={`link-${item.link}-${item.title}`}
              className={"text-mgrey100 text-sm hover:text-yellow_dark"}
            >
              {item.title}
            </Link>
          );
        })}
      </div>

      {!userInfo?.first_name ? (
        <Link
          className="bg-transparent border border-mgrey100 px-5 py-3 text-mgrey100 rounded-md text-sm font-medium max-herobr03:text-[0.7rem]"
          href="/auth/login"
        >
          Get started
        </Link>
      ) : (
        <UserDropDown
          username={`${userInfo?.first_name} ${userInfo?.last_name}`}
        />
      )}

      <div className="flex herobr02:hidden">
        <RiMenuLine className="fill-mgrey100" size={25} />
      </div>
    </nav>
  );
}

export default Nav;
