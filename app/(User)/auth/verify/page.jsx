"use client";

import mail from "@/public/images/mail.png";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import LoadableButton from "@/components/LoadableButton";
import Head from "next/head";
import usePostRequest from "@/hooks/usePost";
import { baseBeUrl } from "@/urls/be";
import { useRouter, useSearchParams } from "next/navigation";
import { urlConfig } from "@/urls/fe";
import { useToast } from "@/hooks/use-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import useGetResponseMessage from "@/hooks/useGetResponseMessage";
import Loader from "@/components/Loader";
import { handleGenericError } from "@/utils/errorHandler";
import { Suspense } from 'react';
import PageLoader from "@/components/PageLoader";


const Page = () => {
  const postRequest = usePostRequest();
  const router = useRouter();
  const { toast } = useToast();
  const grm = useGetResponseMessage();

  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  if(!email){
    router.push(urlConfig.SIGNUP)
  }

  const verificationUrl = `${baseBeUrl}/auth/verify/`;
  const { mutate, isLoading: isVerifyLoading } = postRequest(
    verificationUrl,
    () => {
      toast({
        title: "Account verified",
        description: "Your account was verified successfully, you can now login",
        variant: 'success'
      })

      router.push(urlConfig.LOGIN)
    },
    (response) => {
      toast({
        title: "Error",
        description: grm(response, "Something went wrong"),
        variant: "destructive",
      });
    }
  );

  const resendVerificationUrl = `${baseBeUrl}/auth/verify/otp/resend/`
  const {mutate: resendOtp, isLoading: isResendLoading} = postRequest(resendVerificationUrl, (response) => {
    toast({
      description: 'Verification code resent successfully',
    })
  }, (response) => {
      toast({
        description: handleGenericError(response),
        variant: 'destructive'
      })
  })

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userOtp = formData.get("otp");
    if (userOtp.length < 6) {
      toast({
        title: "Invalid otp",
        description: "OTP must be 6 digits",
        variant: "destructive",
      });
      return;
    }

    const requestBody = {
      email: email,
      otp: userOtp,
    };

    mutate(requestBody);
  };

  return (
    <Suspense fallback={<PageLoader/>}>
      <Head>
        <title>Verify your account</title>
        <meta name="description" content="Description of my page" />
      </Head>
      <section className="flex flex-col items-center w-screen h-screen justify-center">
      
        <div className="flex flex-col items-center w-[90%] max-w-[500px]">
          <Image src={mail} alt={"mail"} width={70} height={70} />
          <h1 className="text-xl sm:text-2xl font-bold mt-5 text-green01">
            Enter verification code
          </h1>
          <p className="max-w-[400px] text-center opacity-50 max-sm:text-sm">
            An email containing your 6-digit verification code has been sent to{" "}
            <b className="opacity-80">{email}</b>
          </p>
          <form action="" onSubmit={onFormSubmit}>
            <InputOTP
              maxLength={6}
              className="mt-5"
              name="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="gap-2 mt-5">
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot
                    key={`slot-${index}`}
                    index={index}
                    className="w-[40px] h-[40px]  br350:w-[50px] br350:h-[50px] sm:w-[70px] sm:h-[70px] border border-[#cccccc] text-xl"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="flex flex-row gap-5 items-center mt-5 w-full">
              {/* <LoadableButton label="Cancel" isFilled={false} onClick={handleCancelClick}/> */}
              <LoadableButton label="Verify" isLoading={isVerifyLoading} />
            </div>

            <div className="w-full flex mt-5 items-center justify-center gap-2">
              <p className="text-green01">
                Didnt get the code?
              </p>

              {
                !isResendLoading ?
                <b onClick={resendOtp.bind(null, {email: email})} className="text-green01 underline cursor-pointer">Resend</b> :
                 <Loader variant="circle"/>
              }
            </div>
          </form>
        </div>
      </section>
    </Suspense>
  );
};

export default Page;
