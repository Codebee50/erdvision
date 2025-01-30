import React, { useState } from "react";
import LogoText from "../LogoText";
import { FiUploadCloud } from "react-icons/fi";
import MenuItem from "../MenuItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuFileCode2 } from "react-icons/lu";
import { CgImage } from "react-icons/cg";
import usePostRequest from "@/hooks/usePost";
import { toast } from "@/hooks/use-toast";
import { handleGenericError } from "@/utils/errorHandler";
import { baseBeUrl } from "@/urls/be";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import ShuffleLoader from "../ShuffleLoader";
import useFetchRequest from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import UserImage from "../UserImage";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FormInput from "../FormInput";
import LoadableButton from "../LoadableButton";

const DiagramHeader = ({ diagram, members = [] }) => {
  const postRequest = usePostRequest();
  const { userInfo } = useSelector((state) => state.auth);
  const exportUrl = `${baseBeUrl}/export/script/${diagram.id}/`;
  const { mutate: exportDiagramScript, isLoading: isExportingScript } =
    useFetchRequest(
      exportUrl,
      (response) => {
        console.log(response);
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;

        const contentDisposition = response.headers["content-disposition"]; // Access headers
        const fileName = contentDisposition
          ? contentDisposition.split("filename=")[1]
          : `erdvision-${diagram.id}.txt`;
        link.download = fileName.replace(/['"]/g, ""); // Remove any quotes
        link.click();

        window.URL.revokeObjectURL(url);
      },
      (error) => {
        toast({
          title: handleGenericError(error),
          variant: "destructive",
        });
      },
      "blob"
    );

  const { mutate: sendInvite, isLoading: isInvitingUser } = postRequest(
    `${baseBeUrl}/diagram/invite/${diagram.id}/`,
    (response) => {
      toast({
        description: "User invited successfully",
        variant: "success",
      });
    },
    (error) => {
      toast({
        description: handleGenericError(error),
        variant: "destructive",
      });
    }
  );

  const handleFormSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    sendInvite({
      email: formData.get("email"),
    });
  };

  return (
    <section
      className=" w-screen h-[10vh] bg-green01 top-0 z-20 flex flex-row justify-between items-center px-6 py-2 "
      id="diagram-header"
    >
      <div className="flex flex-row items-center gap-3">
        <LogoText
          logoColor="#7ED6DF"
          textClassName="text-green02 font-medium text-green01"
        />

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuItem text="Export" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="rounded-sm shadow-sm">
              <DropdownMenuItem>
                <div
                  className="flex flex-row items-center gap-2"
                  onClick={exportDiagramScript.bind(null)}
                >
                  <LuFileCode2 color="#4CE4CF" />
                  <p className="font-medium">Script</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-row items-center gap-2">
                  <CgImage color="#FE9900" />
                  <p className="font-medium">Image</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <MenuItem text="Share" />
        </div>
      </div>

      <AlertDialog open={isExportingScript}>
        <AlertDialogContent className="flex flex-row items-center gap-2 w-max">
          <ShuffleLoader />
          <p className="font-medium">Exporting diagram</p>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <h2 className="font-semibold text-sm text-white">{diagram?.name}</h2>
        <div className="flex flex-row items-center gap-2">
          <p className="font-extralight text-sm text-mgrey100">
            Saved 3 mins ago
          </p>
          <div className="w-[3px] h-[3px] bg-[#D9D9D9]"></div>
          <p className="font-semibold text-green02 text-sm cursor-pointer">
            Save
          </p>
        </div>
      </div>

      {/* <button className="cursor-pointer flex flex-row items-center gap-2 bg-green01 p-3 rounded-md">
        <FiUploadCloud color="#ffffff" />
        <p className="text-[0.8rem] text-white">Sync changes</p>
      </button> */}
      <Popover>
        <PopoverTrigger>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center space-x-[-5px]">
              <UserImage
                image={diagram?.creator?.profile_picture}
                rounded={true}
                className="w-[25px] h-[25px] rounded-full object-cover object-center border border-green01"
              />
              {members.slice(0, 3).map((member) => {
                return (
                  <UserImage
                    image={member.user?.profile_picture}
                    rounded={true}
                    className="w-[25px] h-[25px] rounded-full object-cover object-center border border-green01"
                  />
                );
              })}
            </div>

            {/* <p className="text-sm text-mgrey100 max-w-[70px] text-nowrap overflow-hidden overflow-ellipsis">
          {userInfo?.first_name}
        </p> */}
            <MdKeyboardArrowDown className={"fill-mgrey100"} size={15} />
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-3 w-[400px] shadow-sm rounded-sm">
          <div className="w-full">
            <p className="font-semibold text-green01">Members</p>
            <p className="text-slate-500 text-[0.8rem] opacity-75">
              Users who have access to this diagram
            </p>

            <div className="w-[90%] h-[1px] bg-mgrey100 my-2"></div>

            {diagram?.creator?.id === userInfo?.id && (
              <form className="flex flex-col" onSubmit={handleFormSubmitted}>
                <p className="text-[0.9rem] text-green01 font-bold mt-3">
                  Invite member
                </p>

                <div className="w-full flex flex-row items-center gap-2 mt-2">
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-mgrey100 outline-none p-2 rounded-md"
                    placeholder="Enter user email"
                    id="email"
                    required
                  />
                  {/* <LoadableButton isLoading={isInvitingUser} label="Submit"/> */}
                  {isInvitingUser ? (
                    <ShuffleLoader />
                  ) : (
                    <button className="text-white bg-green01 rounded-md p-2">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            )}

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex flex-row items-center gap-3">
                <UserImage
                  image={diagram?.creator?.profile_picture}
                  rounded={true}
                  className="w-[30px] h-[30px] rounded-full object-cover object-center"
                />
                <div className="flex flex-col">
                  <p className="font-medium text-sm text-green01">
                    {diagram?.creator.first_name} {diagram?.creator?.last_name}
                  </p>
                  <p className="text-[0.8rem] text-green01 opacity-55">
                    {diagram?.creator.email}
                  </p>
                </div>
              </div>
              {members.map((member) => {
                return (
                  <div className="flex flex-row items-center gap-3">
                    <UserImage
                      image={member?.user?.profile_picture}
                      rounded={true}
                      className="w-[30px] h-[30px] rounded-full object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium text-sm text-green01">
                        {member.user.first_name} {member.user.last_name}
                      </p>
                      <p className="text-[0.8rem] text-green01 opacity-55">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default DiagramHeader;
