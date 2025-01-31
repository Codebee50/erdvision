"use client";

import React, { useEffect, useState } from "react";
import LogoText from "@/components/LogoText";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import useFetchData from "@/hooks/useFetch";
import user from "@/public/images/user.png";
import { useToast } from "@/hooks/use-toast";
import usePostRequest from "@/hooks/usePost";
import { baseBeUrl } from "@/urls/be";
import LoadableButton from "@/components/LoadableButton";
import { useRouter } from "next/navigation";
import { handleGenericError } from "@/utils/errorHandler";

const Page = () => {
  const { toast } = useToast();
  const postRequest = usePostRequest();
  const router = useRouter();
  // const [defaultCountry, setDefaultCountry] = useState({});

  // const {
  //   response: countries,
  //   loading: countryLoading,
  //   error,
  // } = useFetchData({
  //   url: "https://restcountries.com/v3.1/all?fields=name,idd,flags",
  //   onSuccess:(response)=>{
  //     const defaultCountry = response.data.find((country)=> country.name.common.toLowerCase() === 'nigeria')
  //     setDefaultCountry(defaultCountry)
  //   }
  // });

  const signUpUrl = `${baseBeUrl}/auth/register/`;
  const { mutate, isLoading } = postRequest(
    signUpUrl,
    (response) => {
      toast({ description: response.data.message });
      router.push(`/auth/verify/?email=${response.data.data.email}`);
    },
    (response) => {
      //on error
      toast({
        description: handleGenericError(response),
        variant: "destructive",
      });
    }
  );

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    mutate(formData);
    console.log(formData.values);
  };

  return (
    <>
      <section className="w-screen h-screen flex max-[1020px]:flex-col flex-row bg-white">
        <div className="max-[1020px]:w-full w-[40%] bg-green01 flex flex-col p-9 gap-3">
          <LogoText />

          <h1 className="text-green02 font-semibold  text-[3rem] leading-[1.2] mt-5 max-[450px]:text-[1.2rem]">
            Start creating powerful database diagrams effortlessly.
          </h1>
          <p className="text-mgrey100 text-sm max-[450px]:text-[0.7rem] flex-grow">
            Unlock the power of seamless database visualization! Get started now
            and effortlessly bring your database diagrams to life. Simplify
            complex structures, enhance collaboration, and turn your ideas into
            reality with our intuitive diagramming tools.
          </p>

          <div className="w-full bg-green02transparent p-7 rounded-2xl flex flex-col mt-5">
            <p className="text-white font-bold max-[450px]:text-[0.7rem]">
              What a relief!
            </p>

            <p className="text-white mt-2 max-[450px]:text-[0.7rem]">
              It saved me so much time and made my designs look professional
              with minimal effort!
            </p>

            <div className="flex flex-row items-center mt-5 gap-4">
              <Image
                alt=""
                src={user.src}
                width={32}
                height={32}
                className="rounded-full bg-blue-400"
              ></Image>
              <p className="text-white font-bold max-[450px]:text-[0.7rem]">
                Grace Albert
              </p>
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
              <FormInput
                label="First name"
                placeholder="First name"
                required={true}
                name="first_name"
              />
              <FormInput
                label="Last name"
                placeholder="Last name"
                required={true}
                name="last_name"
              />
            </div>

            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              conClassName="mt-6"
              required={true}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter a strong password"
              name="password"
              conClassName="mt-6"
              required={true}
            />
            {/* 
            <input
              type="submit"
              value="Create account"
              className="w-full p-4 rounded-md mt-5 cursor-pointer bg-green01 text-white"
            /> */}

            <LoadableButton label="Create account" isLoading={isLoading} />

            <p className={"self-center justify-self-center mt-3"}>
              Already have an account?{" "}
              <a href={"/auth/login/"} className={"text-green01 font-bold"}>
                Login
              </a>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Page;
