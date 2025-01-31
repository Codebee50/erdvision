"use client"

import LogoText from "@/components/LogoText";
import React from "react";
import FormInput from "@/components/FormInput";

function Page(props) {
  return (
    <section className="w-screen h-screen flex max-[1020px]:flex-col flex-row bg-white">
      <div className="max-[1020px]:w-full w-[40%] bg-green01 flex flex-col p-9 gap-3">
        <LogoText />
      </div>

      <div className="max-[1020px]:w-full w-[60%] bg-white flex flex-col p-10 sm:p-16 md:p-32  justify-center">
        <h1 className="text-black font-bold text-3xl">Reset your password</h1>
        <form className="w-full mt-5">
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            conClassName="mt-6"
          />
          <input
            type="submit"
            value="Submit"
            className="w-full p-4 rounded-md mt-5 cursor-pointer bg-green01 text-white"
          />
        </form>
      </div>
    </section>
  );
}

export default Page;
