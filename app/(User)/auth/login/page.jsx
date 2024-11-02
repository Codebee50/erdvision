'use client'

import LogoText from "@/components/LogoText";
import React from "react";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import { useQuery } from "@tanstack/react-query";
const Page = () => {

  const fetchcountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name')
    return response.json()
  }


  const {data, isLoading} = useQuery({
    queryFn: () => fetchcountries(),
    queryKey: ['countries']
  })

  console.log(isLoading)

  console.log(data)

  // display all countries in a dropdown for the country select 

  //display all countries, flag, and country code for the phone number


  return (
    <section className="w-screen h-screen flex flex-row bg-white">
      <div className="w-[40%] bg-blue_dark h-screen flex flex-col p-9 gap-3">
        <LogoText />

        <h1 className="text-yellow_dark font-semibold  text-[3.3rem] leading-[1.2] mt-5">
          Start creating powerful database diagrams effortlessly.
        </h1>
        <p className="text-white text-sm flex-grow">
          Unlock the power of seamless database visualization! Get started now
          and effortlessly bring your database diagrams to life. Simplify
          complex structures, enhance collaboration, and turn your ideas into
          reality with our intuitive diagramming tools.
        </p>

        <div className="w-full bg-[#1B263B] p-7 rounded-2xl flex flex-col mt-5">
          <p className="text-white font-bold">What a relief!</p>

          <p className="text-white mt-2">
            It saved me so much time and made my designs look professional with
            minimal effort!
          </p>

          <div className="flex flex-row items-center mt-5 gap-4">
            <Image
              alt=""
              src="/images/avatar.png"
              width={32}
              height={32}
              className="rounded-full bg-blue-400"
            ></Image>
            <p className="text-white font-bold">Grace Albert</p>
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-center gap-2">
          {[1, 2, 3].map((index) => (
            <div
              key={`round-dot-${index}`}
              className="w-2 h-2 bg-[#F0F0F0] rounded-full"
            ></div>
          ))}
        </div>
      </div>

      <div className="w-[60%] bg-white h-screen flex flex-col p-9">
        <h1 className="text-black font-bold text-3xl">Sign up</h1>
        <form action="" className="mt-5 w-full">
          <div className="w-full flex flex-row items-center gap-5">
            <FormInput label="First name" placeholder="First name" />
            <FormInput label="Last name" placeholder="Last name" />
          </div>

          <FormInput label="Email" type="email" placeholder="Enter your email" conClassName="mt-6"/>
          <FormInput label="Password" type="password" placeholder="" conClassName="mt-6"/>

        </form>
      </div>
    </section>
  );
};

export default Page;
