"use client";

import React, {useEffect, useState} from "react";
import LogoText from "@/components/LogoText";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import useFetchData from "@/Hooks/useFetch";

const Page = () => {

  const [defaultCountry, setDefaultCountry] = useState({});

  const {
    response: countries,
    loading: countryLoading,
    error,
  } = useFetchData({
    url: "https://restcountries.com/v3.1/all?fields=name,idd,flags",
    onSuccess:(response)=>{
      const defaultCountry = response.data.find((country)=> country.name.common.toLowerCase() === 'nigeria')
      setDefaultCountry(defaultCountry)
    }
  });


  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);

    console.log('COUNTRY',formData.get("country"));
  };


  return (
    <section className="w-screen h-screen flex max-[1020px]:flex-col flex-row bg-white">
      <div className="max-[1020px]:w-full w-[40%] bg-blue_dark flex flex-col p-9 gap-3">
        <LogoText />

        <h1 className="text-yellow_dark font-semibold  text-[3.3rem] leading-[1.2] mt-5 max-[450px]:text-[2.6rem]">
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

      <div className="max-[1020px]:w-full w-[60%] bg-white flex flex-col p-10 sm:p-16 md:p-32  justify-center">
        <h1 className="text-black font-bold text-3xl">Sign up</h1>
        <form action="" className="mt-5 w-full" onSubmit={onFormSubmit}>
          <div className="w-full flex flex-row max-[540px]:flex-wrap items-center gap-5">
            <FormInput label="First name" placeholder="First name" />
            <FormInput label="Last name" placeholder="Last name" />
          </div>

          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            conClassName="mt-6"
          />
          <FormInput
            label="Password"
            type="password"
            placeholder=""
            name="password"
            conClassName="mt-6"
          />



          <input
              type="submit"
              value="Create account"
              className="w-full p-4 rounded-md mt-5 cursor-pointer bg-blue_dark text-white"
          />

          <p className={'self-center justify-self-center mt-3'}>Already have an account? <a href={'/auth/login/'} className={'text-blue_dark font-bold'}>Login</a> </p>
        </form>
      </div>
    </section>
  );
};

export default Page;
