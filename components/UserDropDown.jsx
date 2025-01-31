import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import userImage from "@/public/images/user.png";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosPower } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { toast } from "@/hooks/use-toast";
import usePostRequest from "@/hooks/usePost";
import { baseBeUrl } from "@/urls/be";
import Cookies from "js-cookie";
import Loader from "./Loader";
import { handleGenericError } from "@/utils/errorHandler";

const UserDropDown = ({ username }) => {
  const postRequest = usePostRequest();
  const dispatch = useDispatch();

  const { mutate, isLoading: logoutLoading } = postRequest(
    `${baseBeUrl}/auth/logout/`,
    () => {
      dispatch(logout());
      toast({
        description: "Logout successful",
      });
    },
    (response) => {
      toast({
        title: "Logout failed",
        description: handleGenericError(response),
        variant: "destructive",
      });
    }
  );

  return (
    <button>
      <Popover>
        <PopoverTrigger>
          <div
            className={
              "hidden herobr02:flex flex-row items-center gap-2 cursor-pointer"
            }
          >
            <Image
              src={userImage.src}
              alt={"user_profile"}
              width={25}
              height={25}
            />
            <div className={"flex flex-col"}>
              <p
                className={
                  "text-white max-w-[150px] text-nowrap overflow-hidden overflow-ellipsis text-sm"
                }
                title={`${username}`}
              >
                {username}
              </p>
              {/* <p className={'text-yellow_dark text-sm max-w-[140px] text-nowrap overflow-ellipsis overflow-hidden'} title={'udokyrian@outlook.com'}>udokyrian@outlook.com</p> */}
            </div>
            <MdKeyboardArrowDown className={"fill-mgrey100"} size={20} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-[#0e0f0f] border-none max-w-[150px] flex flex-col">
          <div
            className="cursor-pointer w-full flex items-center justify-center"
            onClick={() => {
              mutate({
                refresh: Cookies.get("refreshToken"),
              });
            }}
          >
            {logoutLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-row items-center w-full gap-3">
                <FaPowerOff className="fill-red-800" on />
                <p className="text-white text-sm">Logout</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </button>
  );
};

export default UserDropDown;
