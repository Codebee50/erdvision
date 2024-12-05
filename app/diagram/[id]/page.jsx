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

const Page = () => {
  const [scale, setScale] = useState(1); // For zooming
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); // For panning
  const containerRef = useRef(null);
  const { id } = useParams();
  const [diagram, setDiagram] = useState(null);

  const fitCenter = () => {
    const container = containerRef.current;

    if (container) {
      const content = container.firstChild; // Assuming the first child is the large div
      if (content) {
        // Calculate the center position
        const scrollLeft = (content.offsetWidth - container.offsetWidth) / 2;
        const scrollTop = (content.offsetHeight - container.offsetHeight) / 2;

        // Set the scroll position
        container.scrollLeft = scrollLeft;
        container.scrollTop = scrollTop;
      }
    }
  };

  // const detailUrl = `${baseBeUrl}/diagram/detail/${id}`;
  // const { mutate: fetchDiagram, isLoading: isFetchingDiagram } =
  //   useFetchRequest(
  //     detailUrl,
  //     (response) => {
  //       console.log(response);
  //       setDiagram(response.data);
  //       fitCenter()
  //     },
  //     (error) => {}
  //   );

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      // Prevent default scrolling when zooming
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; // Zoom in or out
      setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 3));
    }
    // If not pinching or using Ctrl, allow normal scrolling
  };

  const handleDrag = (e) => {
    if (e.buttons !== 1) return; // Ensure left-click is pressed
    setTranslate((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  // Center the section scroll position
  useEffect(() => {
    fitCenter();
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    // Attach the wheel event listener
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      // Cleanup the event listener
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    // fetchDiagram();
  }, []);

  // if (isFetchingDiagram) {
  //   return <PageLoader />;
  // }

  // if(!isFetchingDiagram && !diagram){
  //   return <section className="w-full min-h-screen flex items-center justify-center">Diagram not found</section>
  // }

  return (
    <section className="w-full min-h-screen relative">
      <section
        ref={containerRef}
        className="w-screen h-screen overflow-scroll bg-[#378db8] cursor-grab"
        onMouseMove={handleDrag}
      >
        <div
          className="w-[10000px] h-[10000px] flex items-center justify-center gap-2 bg-mgrey100 dot-grid-background"
          style={{
            transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
          }}
        >
          <div className="w-24 h-24 bg-blue-500 rounded-lg shadow-lg text-white text-center flex items-center justify-center cursor-move flex-col">
            <p>Box 1</p>
            <p className="text-sm">A first text</p>
          </div>
          <div className="w-24 h-24 bg-red-500 rounded-lg shadow-lg text-white text-center flex items-center justify-center cursor-pointer flex-col">
            <p>Box 2</p>
            <p className="text-sm">A second text</p>
          </div>
          <div className="w-[100px] h-[100px] bg-red-500 rounded-lg shadow-lg text-white text-center flex items-center justify-center cursor-pointer flex-col">
            <p>Box 3</p>
            <p className="text-sm">A third text</p>
          </div>
        </div>
      </section>

      <section className="absolute z-10 w-[350px] h-screen top-0 bg-white flex flex-row">
        {/* <div className="w-[60px] h-screen bg-mgrey100"></div> */}
        <div className="w-full bg-white flex flex-col mt-[70px] gap-2 overflow-scroll no-scrollbar">
          {dummyTablesList.map((item) => {
            return (
              <div className="flex flex-col" key={item.name}>
                <div className="p-2 flex flex-row items-center justify-between cursor-pointer bg-mgrey100 hover:bg-green02 transition-all">
                  <div className="flex flex-row items-center gap-2">
                    <IoIosArrowForward size={12} />
                    <p className="text-[0.9rem] font-semibold text-green01">
                      {item.name}
                    </p>
                  </div>

                  <p className="text-[0.7rem] font-extralight text-green01">
                    2 cols
                  </p>

                  <div className="flex flex-row items-center gap-4">
                    <button>
                      <LiaEdit />
                    </button>
                    <button>
                      <MdCenterFocusWeak />
                    </button>
                    <button>
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>

                <div className="w-full flex flex-col">
                  {item.columns.map((column, index) => {
                    return (
                      <div className="w-full flex flex-row items-center justify-between p-2" key={column.name}>
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

                        {
                          index ===0 && <p className="text-blue01 text-[0.8rem] font-semibold">PK</p>
                        }

                        <div></div>
                        <div className="cursor-pointer">
                          <RiMoreFill/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="absolute w-screen h-[60px] bg-white top-0 z-20 flex flex-row justify-between items-center px-6 py-2"
        id="diagram-header"
      >
        <LogoText logoColor="#000" textClassName="font-medium text-green01" />

        <div>
          <h2 className="font-semibold text-sm">The peoples project</h2>
          <div className="flex flex-row items-center gap-2">
            <p className="font-extralight text-sm">Saved 3 mins ago</p>
            <div className="w-[3px] h-[3px] bg-[#D9D9D9]"></div>
            <p className="font-semibold text-blue01 text-sm cursor-pointer">
              Save
            </p>
          </div>
        </div>

        <button className="cursor-pointer flex flex-row items-center gap-2 bg-green01 p-3 rounded-md">
          <FiUploadCloud color="#ffffff" />
          <p className="text-[0.8rem] text-white">Sync changes</p>
        </button>
      </section>
    </section>
  );
};

export default Page;
