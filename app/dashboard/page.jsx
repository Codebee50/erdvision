"use client";

import LogoText from "@/components/LogoText";
import React, { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import userImage from "@/public/images/user.png";
import Image from "next/image";
import { FaRegFileAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { PiCaretDown } from "react-icons/pi";

import { useRouter } from "next/navigation";
import AuthProtected from "@/components/user/AuthProtected";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "@/components/FormInput";
import LoadableButton from "@/components/LoadableButton";
import SelectDatabaseTypes from "@/components/SelectDatabaseTypes";
import SelectVisibility from "@/components/SelectVisibility";
import usePostRequest from "@/hooks/usePost";
import useFetchRequest from "@/hooks/useFetch";
import { baseBeUrl } from "@/urls/be";
import { toast } from "@/hooks/use-toast";
import { handleGenericError } from "@/utils/errorHandler";
import PageLoader from "@/components/PageLoader";
import ProfileImage from "@/components/user/ProfileImage";
import DiagramSkeletonLoader from "@/components/diagrams/DiagramSkeletonLoader";
import DiagramPreview from "@/components/diagrams/DiagramPreview";

const Page = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();
  const postRequest = usePostRequest();
  const [diagramList, setDiagramList] = useState([]);
  // const onDiagramClick = () => {
  //   setCreateDialogOpen(true);
  // };

  const { mutate: fetchDiagrams, isLoading: diagramsLoading } = useFetchRequest(
    `${baseBeUrl}/diagram/list/`,
    (response) => {
      console.log(response);
      setDiagramList(response.data);
    },
    (error) => {
      toast({
        description: handleGenericError(error),
        variant: "destructive",
      });
    }
  );

  const createUrl = `${baseBeUrl}/diagram/create/`;
  const { mutate: createDiagram, isLoading: createDiagramLoading } =
    postRequest(
      createUrl,
      (successResponse) => {
        toast({
          description: "Diagram created successfully",
          title: "Success",
        });

        router.push(`/diagram/${successResponse.data.id}`);
      },
      (errorResponse) => {
        toast({
          description: handleGenericError(errorResponse),
          variant: "destructive",
        });
      }
    );

  const handleDiagramCreateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    createDiagram(formData);
  };


  const handleDiagramDeleted = (diagramId)=>{
      setDiagramList((prevList)=>prevList.filter((item)=> item.id !== diagramId))
  }


  useEffect(() => {
    fetchDiagrams();
  }, []);

  return (
    <AuthProtected>
      <section className="padding-x py-10">
        <div className="flex flex-row items-center w-full justify-between">
          <LogoText
            logoColor="#14213D"
            textClassName="text-green01 font-medium"
          />

          <div className="flex flex-row items-center gap-8 max-sm:gap-6">
            <div className="relative">
              <div className="bg-red-600 absolute w-[8px] h-[8px] rounded-full z-10 right-0"></div>
              <HiOutlineBell className="w-[24px] h-[24px]" />
            </div>

            <IoSettingsOutline className="w-[24px] h-[24px]" />

            <ProfileImage src={userInfo?.profile_picture} />
          </div>
        </div>

        <div className="w-full flex flex-row items-center py-20 justify-between max-[470px]:flex-col max-[470px]:items-start max-[470px]:justify-start  max-[470px]:gap-5 ">
          <div className="flex flex-row items-center gap-3 ">
            {/* <Image width={40} height={40} alt="user" src={userImage.src} /> */}
            <ProfileImage src={userInfo?.profile_picture} />

            <div className="flex flex-col">
              <h3 className="font-semibold">{`${userInfo?.first_name} ${userInfo?.last_name}`}</h3>
              <p className="text-sm opacity-80">{userInfo?.email}</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger>
              <button
                className="bg-green01 rounded-md text-white px-4 py-3 flex flex-row items-center gap-2 max-sm:text-sm max-[470px]:mt-5"
                // onClick={onDiagramClick}
              >
                <FaRegFileAlt />
                New Diagram
              </button>
            </DialogTrigger>

            <DialogContent>
              <div className="w-full h-full">
                <h1 className="font-medium">New diagram</h1>

                <form
                  className="mt-5 flex flex-col w-full gap-5"
                  method="POST"
                  onSubmit={handleDiagramCreateSubmit}
                >
                  <FormInput
                    label="Title"
                    placeholder="Enter a title"
                    name="name"
                    required={true}
                  />
                  <FormInput
                    type="textarea"
                    placeholder="Describe your diagram"
                    label="Description"
                    rootElement="textarea"
                    name="description"
                    required={true}
                  />
                  <SelectDatabaseTypes />

                  {/* <SelectVisibility /> */}

                  <LoadableButton
                    label="Submit"
                    isLoading={createDiagramLoading}
                  />
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full h-[2px] bg-mgrey100"></div>

        <div className="w-full flex flex-row items-center py-4 gap-4">
          <p className="text-green01 font-medium shrink-0">
            {diagramList.length} diagrams
          </p>
          <div className="w-[2px] bg-mgrey100 h-[25px]"></div>

          <div className="w-full flex flex-row items-center gap-4 cursor-pointer">
            <HiMenuAlt3 size={20} />
            <p>Most recent</p>
            <PiCaretDown />
          </div>
        </div>

        <PageLoader isVisible={diagramsLoading} />

        {diagramList.length == 0 ? (
          <section className={`w-full h-[50vh] ${diagramsLoading?'hidden': 'flex'} items-center justify-center`}>

            <p className="font-medium text-mblack100">You have not created any diagrams</p>
          </section>
        ) : (
          <div
            className={`w-full ${diagramsLoading?'hidden': 'grid'} grid-cols-3 gap-5 py-10 max-lg:grid-cols-2 max-herobr03:grid-cols-1`}
          >
            {diagramList.map((item) => (
              <DiagramPreview key={item.name} diagram={item} onDiagramDeleted={handleDiagramDeleted}/>
            ))}
          </div>
        )}
      </section>
    </AuthProtected>
  );
};

export default Page;
