"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import useFetchRequest from "@/hooks/useFetch";
import { baseBeUrl } from "@/urls/be";
import PageLoader from "@/components/PageLoader";
import LogoText from "@/components/LogoText";
import { FiUploadCloud } from "react-icons/fi";
import { dummyTablesList } from "@/constants/dummy";
import { IoIosArrowForward } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { LiaEdit } from "react-icons/lia";
import { MdCenterFocusWeak } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import FlowCanvas from "@/components/diagrams/FlowCanvas";
import { useToast } from "@/hooks/use-toast";
import { IoAdd, IoAddSharp } from "react-icons/io5";
import AuthProtected from "@/components/user/AuthProtected";

const Page = () => {
  const [scale, setScale] = useState(1); // For zooming
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); // For panning
  const containerRef = useRef(null);
  const { id } = useParams();
  const [diagram, setDiagram] = useState(null);
  const [error, setError] = useState(false);

  const { toast } = useToast();

  const detailUrl = `${baseBeUrl}/diagram/detail/${id}`;
  const { mutate: fetchDiagram, isLoading: isFetchingDiagram } =
    useFetchRequest(
      detailUrl,
      (response) => {
        console.log(response);
        setDiagram(response.data);
      },
      (error) => {
        console.log("An error occured", error);
        setError(true);
      }
    );

  useEffect(() => {
    fetchDiagram();
  }, []);

  if (isFetchingDiagram) {
    return <PageLoader loaderSize={60} />;
  }

  if (error) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center">
        {/* TODO: make this finer */}
        <p className="font-medium text-xl text-red-500">Error fetching diagram</p>
      </section>
    );
  }

  const handleSyncChanges = () => {
    console.log("syncinig");
    toast({
      title: "hello",
      swipeDirection: "left",
    });
  };

  return (
    <AuthProtected>
      <section className="w-full min-h-screen relative flex flex-col">
        <section
          className=" w-screen h-[10vh] bg-green01 top-0 z-20 flex flex-row justify-between items-center px-6 py-2 "
          id="diagram-header"
        >
          <LogoText
            logoColor="#7ED6DF"
            textClassName="text-green02 font-medium text-green01"
          />

          <div>
            <h2 className="font-semibold text-sm text-white">
              The peoples project
            </h2>
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
            <p className="text-[0.8rem] text-white" onClick={handleSyncChanges}>
              Sync changes
            </p>
          </button>
        </section>

        <div className="w-full flex flex-row h-[90vh]">
          <section className="z-10 w-[25%] h-full top-0 bg-white flex flex-row border-r">
            {/* <div className="w-[60px] h-screen bg-mgrey100"></div> */}

            <div className="w-full bg-white flex flex-col overflow-scroll no-scrollbar">
              <div className="w-full flex flex-row items-center justify-between p-2 text-[0.9rem] bg-[#CAF9FD]">
                <p>(4) Tables</p>

                <div
                  className="p-1 hover:bg-green01 cursor-pointer transition-all ease-in-out rounded-sm"
                  title="New table"
                >
                  <IoAdd size={20} className="hover:text-green02" />
                </div>
              </div>

              <div className="flex flex-col gap-2 overflow-scroll no-scrollbar">
                {dummyTablesList.map((item) => {
                  return (
                    <div className="flex flex-col" key={item.name}>
                      <div className="p-2 flex flex-row items-center justify-between cursor-pointer bg-[#F8FAFF] hover:bg-mgrey100 transition-all">
                        <div className="flex flex-row items-center gap-2">
                          <IoIosArrowForward size={12} />

                          <div className="flex flex-col">
                            <p className="text-[0.9rem] font-medium text-green-900">
                              {item.name}
                            </p>
                          </div>
                        </div>

                        <p className="text-[0.7rem] font-extralight text-green01">
                          2 cols
                        </p>
                      </div>

                      <div className="w-full flex flex-col hidden">
                        {item.columns.map((column, index) => {
                          return (
                            <div
                              className="w-full flex flex-row items-center justify-between p-2"
                              key={column.name}
                            >
                              <div className="flex flex-row items-center gap-3">
                                <div className="w-[9px] h-[9px] rounded-full border-[1.5px] border-[#EAEAEC]"></div>
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  defaultValue={column.name}
                                  className="max-w-[90px] text-[0.8rem] p-[5px] border border-mgrey200 outline-green02 rounded-md"
                                />
                                <input
                                  type="text"
                                  defaultValue={column.datatype}
                                  className="max-w-[90px] text-[0.8rem] p-[5px] border rounded-md border-mgrey100 outline-green02"
                                />
                              </div>

                              <div
                                className="p-2 hover:bg-mgrey100 cursor-pointer transition-all ease-in-out rounded-sm"
                                title="Primary key"
                              >
                                <p className="text-blue01 text-[0.8rem] font-semibold">
                                  PK
                                </p>
                              </div>

                              <div
                                className="p-2 hover:bg-mgrey100 cursor-pointer transition-all ease-in-out rounded-sm"
                                title="Nullable"
                              >
                                <p className="text-[#474747] font-semibold text-[0.8rem]">
                                  N
                                </p>
                              </div>

                              <div></div>
                              <div className="cursor-pointer">
                                <RiMoreFill />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="w-[80%] h-full">
            <FlowCanvas />
          </div>
        </div>
      </section>
    </AuthProtected>
  );
};

export default Page;
