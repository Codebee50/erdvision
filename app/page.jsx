"use client";

import Image from "next/image";
import stars from "@/public/images/stars.png";
import partners from "@/public/images/teamwork.png";
import convert from "@/public/images/currency.png";
import { motion } from "framer-motion";
import versioning from "@/public/images/version-control.png";
import { useToast } from "@/hooks/use-toast";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import Link from "next/link";
import LogoText from "@/components/LogoText";
import { reviewList } from "@/constants/constants";
import UserNameImg from "@/components/user/UserNameImg";
import userImage from "@/public/images/user.png";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import UserPercentage from "@/components/user/UserPercentage";
import { useRouter } from "next/navigation";
import AuthProtected from "@/components/user/AuthProtected";

export default function Home() {
  // const [currentBox, setCurrentBox] = useState(0);
  const totalBoxes = 150;

  const { toast } = useToast();
  const router = useRouter()
  const showToast = () => {
    toast({
      title: "Welcome to ERD Vision",
      description: "A database diagramming application",
      swipeDirection: "left",
    });
  };
  const handleAnimationComplete = () => {
    setCurrentBox(Math.floor(Math.random() * 30));
  };

  const innerBoxes = Array.from({ length: totalBoxes }, (_, index) => (
    <motion.div
      key={`inner-box-${index}`}
      className="grid-box h-[100px] md:h-[150px]"
      // animate={
      //   index === currentBox
      //     ? { backgroundColor: ['rgba(255, 255, 255, 0.05)', 'rgba(126, 214, 223, 0.3)', 'rgba(255, 255, 255, 0.05)'] }
      //     : {}
      // }
      // transition={{
      //   duration: 3,
      // }}
      // onAnimationComplete={index === currentBox ? handleAnimationComplete : undefined}
    ></motion.div>
  ));

  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
  }, []);

  const infoBoxes = [
    {
      title: "Collaboration",
      body: "Seamlessly collaborate with your team in real time. Exchange ideas, leave comments, and stay aligned—no matter where you are.",
      image: partners,
    },
    {
      title: "Diagram Conversion",
      body: "Effortlessly transform your database diagrams into clean, production-ready SQL or Python ORM code. Boost productivity and eliminate manual work.",
      image: convert,
    },
    {
      title: "Version Control",
      body: "Track changes, manage versions, and never lose your progress. Easily compare and roll back to previous database versions with just one click.",
      image: versioning,
    },
  ];

  return (
    <AuthProtected>
      <section className="w-full min-h-screen bg-green01 relative">
        <section className="w-screen grid-section overflow-hidden grid-cols-3 br350:grid-cols-4 br475:grid-cols-5 md:grid-cols-6">
          {innerBoxes}
        </section>

        <section className="absolute inset-0 overflow-auto w-screen min-h-screen top-0 bg-green01 opacity-80 flex flex-col py-8 padding-x no-scrollbar">
          <Nav />

          <div className="w-full flex flex-col items-center pt-[50px]">
            <div className="bg-green02transparent text-white px-5 py-2 rounded-md max-[315px]:text-[0.55rem] text-[0.65rem] herobr04:text-[0.8rem] border border-mgrey100 flex flex-row items-center gap-2">
              <Image
                src={stars.src}
                width={20}
                height={20}
                alt="stars"
                className="max-herobr04:w-[15px]"
              ></Image>
              Trusted by users world wide
            </div>

            <h1 className="text-4xl herobr05:text-5xl herobr04:text-6xl max-w-[90%] herobr03:max-w-[70%] font-bold mt-[10px] text-center text-mgrey100">
              Elevate your{" "}
              <span className="background-animate-text">
                Database Diagramming Experience
              </span>
            </h1>

            <p className="mt-5 text-mgrey100 text-center max-w-[90%] herobr03:max-w-[70%] text-[0.8rem] herobr05:text-sm herobr04:text-[1rem]">
              Make all the right moves for your next database application before
              writing a single line of code
            </p>

            <div className="flex flex-row items-center justify-center mt-5 gap-3 flex-wrap">
              <Link
                className="bg-green02 border border-green02 px-5 py-3 text-green01 rounded-md font-medium max-herobr03:text-[0.7rem]"
                href={"/diagram"}
              >
                Start drawing
              </Link>
              <button className="bg-transparent border border-green02 px-5 py-3 text-green02 rounded-md font-medium max-herobr03:text-[0.7rem]" onClick={()=>{
                router.push('/dashboard')
              }}>
                My diagrams
              </button>
            </div>

            <div className="w-full p-0 grid grid-cols-3 items-stretch justify-between mt-12 gap-4 max-herobr04:grid-cols-1">
              {infoBoxes.map((infoBox) => (
                <div
                  key={infoBox.title}
                  className="flex flex-col w-full rounded-lg bg-green02transparent p-3 herobr02:p-7"
                >
                  <Image
                    src={infoBox.image.src}
                    alt={`${infoBox.title} image`}
                    width={40}
                    height={40}
                    className="max-herobr02:w-[30px] max-herobr03:w-[20px]"
                  ></Image>
                  <p className="max-herobr02:text-sm max-herobr03:text-[0.8rem] font-medium text-mgrey100 mt-2">
                    {infoBox.title}
                  </p>
                  <p className="herobr04:mt-1 text-mgrey100 text-[0.6rem] herobr03:text-[0.7rem] herobr02:text-[0.8rem]">
                    {infoBox.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      <section className="w-full min-h-screen hidden flex-col padding-x mt-10">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-xl font-semibold">Customer stories</h1>

          <div className="flex flex-row items-center gap-2">
            <IoMdArrowBack size={24} className="cursor-pointer fill-green02"/>
            <IoMdArrowForward size={24} className="cursor-pointer fill-green01"/>
          </div>
        </div>

        <div className="w-full flex flex-row mt-10">
          <div className="w-[60%]">
            <LogoText
              logoColor="#14213D"
              textClassName="text-green01 font-medium"
              className="opacity-50"
            />

            <p className="max-w-[80%] text-xl mt-4 font-medium leading-[1.8]">
              {reviewList[0].review}
            </p>
            <UserNameImg
              image={userImage.src}
              username={"Seyi Olaoluwa"}
              email={"Finance consultant"}
              className="mt-4"
            />
          </div>

          <div className="w-[40%] flex flex-col gap-10">
            <UserPercentage percentage={100} text={"Of users appreciate seamless conversion of database diagrams to sql"}/> 
            <div className="w-[90%] h-[2px] bg-mgrey100"></div>
            <UserPercentage percentage={100} text={"Of users appreciate the ease of use"}/> 
          </div>
        </div>
      </section>
    </AuthProtected>
  );
}
