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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ShuffleLoader from "../ShuffleLoader";
import useFetchRequest from "@/hooks/useFetch";

const DiagramHeader = ({ diagram }) => {
  const postRequest = usePostRequest();
  const exportUrl = `${baseBeUrl}/export/script/${diagram.id}/`;
  const { mutate: exportDiagramScript, isLoading: isExportingScript } =
    useFetchRequest(
      exportUrl,
      (response) => {
        console.log(response)
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
      'blob'
    );

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

      <button className="cursor-pointer flex flex-row items-center gap-2 bg-green01 p-3 rounded-md">
        <FiUploadCloud color="#ffffff" />
        <p className="text-[0.8rem] text-white">Sync changes</p>
      </button>
    </section>
  );
};

export default DiagramHeader;
