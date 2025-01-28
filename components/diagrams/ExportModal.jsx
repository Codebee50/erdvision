import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaFileCode } from "react-icons/fa6";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { BsFillImageFill } from "react-icons/bs";

import { BiImage } from "react-icons/bi";



const ExportModal = ({ onOpenChange =()=>{}, open=false }) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export diagram</DialogTitle>
          <DialogDescription>
            Select the file type you would like to export your database diagram
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-2 border border-mgrey100 hover:border-green02 transition-all ease-in-out rounded-md cursor-pointer p-2 ">
                <HiOutlineCodeBracketSquare  size={25} color="#8CE967"/>
                <p className="text-sm font-medium">Script</p>
            </div>
            <div className="flex flex-row items-center gap-2 border border-mgrey100 hover:border-green02 transition-all ease-in-out rounded-md cursor-pointer p-2 ">
                <BiImage  size={25} color="#F6494B"/>
                <p className="text-sm font-medium">Image</p>
            </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
