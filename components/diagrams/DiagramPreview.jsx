import React from "react";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { IoMdMore } from "react-icons/io";
import { CgMoreVertical } from "react-icons/cg";
import { CgDetailsMore } from "react-icons/cg";
import { MdArrowOutward } from "react-icons/md";

import { RiDeleteBinLine } from "react-icons/ri";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDelete from "@/hooks/useDelete";
import { baseBeUrl } from "@/urls/be";
import { toast } from "@/hooks/use-toast";
import ShuffleLoader from "../ShuffleLoader";
import { MdOutlineMoreVert } from "react-icons/md";


const DiagramPreview = ({ diagram: item, onDiagramDeleted = () => {} }) => {
  const router = useRouter();
  const handleDiagramClicked = () => {
    router.push(`/diagram/${item.id}`);
  };

  const deleteRequest = useDelete();

  const { mutate: deleteDiagram, isLoading: isDeleting } = deleteRequest(
    `${baseBeUrl}/diagram/delete/${item.id}/`,
    (response) => {
      toast({
        title: "Diagram deleted successfully",
        variant: "success",
      });
      onDiagramDeleted(item.id);
    },
    (error) => {
      toast({
        title: "Failed to delete diagram",
        variant: "destructive",
      });
    }
  );

  const handleDeleteDiagram = () => {
    deleteDiagram();
  };

  return (
    <div
      key={item.name}
      className="w-full h-[300px] bg-mgrey200 rounded-md relative p-8 hover:shadow-xl hover:shadow-mgrey100 transition-shadow"
      //   onClick={handleDiagramClicked.bind(null, item.id)}
    >
      {/* <div className="w-[150px] h-[150px] bg-[#FCA311] opacity-5 rounded-full absolute bottom-5 right-5"></div> */}

      <div className="w-full h-full z-10 flex flex-col">
        <div className="w-full flex flex-row items-center justify-between">
          <h3
            className="text-green01 font-semibold text-xl cursor-pointer"
            onClick={handleDiagramClicked}
          >
            {item.name}
          </h3>
          <Popover>
            <PopoverTrigger>
              <div className="p-2 rounded-md cursor-pointer">
                <MdOutlineMoreVert  size={20} className="fill-[#696969] " />
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-full p-1 shadow-sm">
              <button
                className="flex flex-row items-center gap-4 hover:bg-slate-50 p-2 text-slate-500 text-sm"
                onClick={handleDiagramClicked}
              >
                <MdArrowOutward className="fill-slate-500" />
                <p className="font-medium">Open</p>
              </button>
              {isDeleting ? (
                <ShuffleLoader />
              ) : (
                <button
                  className="flex flex-row items-center gap-4 hover:bg-slate-50 p-2 text-slate-500 text-sm"
                  onClick={handleDeleteDiagram}
                >
                  <RiDeleteBinLine className="fill-red-600" />
                  <p className="font-medium">Delete</p>
                </button>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <p
          className="mt-3 font-light max-sm:text-sm cursor-pointer"
          onClick={handleDiagramClicked}
        >
          {item.description}
        </p>

        <div className="w-full self-end flex flex-row items-center justify-between mt-auto flex-wrap gap-2">
          {/* <p className="font-medium">{item?.objects || 0} Diagrams</p> */}

          <div className="flex flex-row items-center gap-2 opacity-50">
            {item.visibility === "public" ? (
              <HiOutlineEye className="text-green01 font-medium">
                Public
              </HiOutlineEye>
            ) : (
              <RiEyeCloseLine className="text-red-600 font-medium">
                Private
              </RiEyeCloseLine>
            )}

            <p className="capitalize">{item.visibility}</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <button
              className="border border-blue_dark px-4 py-2 text-sm rounded-md cursor-pointer font-medium"
              onClick={handleDiagramClicked}
            >
              Open
            </button>

            {/* <Popover>
              <PopoverTrigger>
                <div className="bg-slate-200 p-2 rounded-md">
                  <CgMoreVertical size={20} className="fill-[#3c2b24] " />
                </div>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col w-full p-1">
                {isDeleting ? (
                  <ShuffleLoader />
                ) : (
                  <button
                    className="flex flex-row items-center gap-4 hover:bg-slate-50 p-2"
                    onClick={handleDeleteDiagram}
                  >
                    <RiDeleteBinLine className="fill-red-600" />
                    <p className="font-medium">Delete</p>
                  </button>
                )}

                <button
                  className="flex flex-row items-center gap-4 hover:bg-slate-50 p-2"
                  onClick={handleDiagramClicked}
                >
                  <MdArrowOutward className="fill-slate-500" />
                  <p className="font-medium">Open</p>
                </button>
              </PopoverContent>
            </Popover> */}
          </div>

          {/* <p>Created {item.created_at}</p> */}
        </div>
      </div>
    </div>
  );
};

export default DiagramPreview;
