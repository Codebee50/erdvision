import React from 'react';
import sampleDiagram from '@/public/images/sample-diagram.png'
import LogoText from "@/components/LogoText";
import SampleTabs from '@/public/images/sample-tabs.svg'
import Image from "next/image";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import SocialButton from "@/components/SocialButton";
import google from '@/public/images/icons/google.png'
import github from '@/public/images/icons/github.png'

function Page(props) {
    return (
        <section className={'w-screen h-screen flex max-[1020px]:flex-col flex-row bg-white'}>
            <div className={'max-[1020px]:w-full w-[40%] bg-blue_dark flex flex-col p-9 gap-3 relative'}>
                <LogoText/>

                <Image src={SampleTabs.src} alt={'Erd vision'} width={200} height={200} layout={'responsive'} className={'w-auto'}/>


                <h1 className="text-yellow_dark font-semibold  text-[2.2rem] leading-[1.2] mt-5 max-[450px]:text-[2.6rem]">
                    Welcome back!
                </h1>
                <p className={'text-white text-sm'}>Every minute you spend in planning saves 10 minutes in execution; this gives you a 1,000 percent return on energy.</p>
            </div>

            <div className={'max-[1020px]:w-full w-[60%] bg-white flex flex-col p-10 sm:p-16 md:p-32 justify-center'}>
                <h1 className="text-black font-bold text-3xl">Login</h1>
                <form className={'mt-5 w-full'}>
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

                    <div className={'w-full flex items-end justify-end mt-5'}>
                        <Link href={"/auth/password/reset"} className={'text-yellow_dark font-semibold'}>Forgot
                            password?</Link>
                    </div>

                    <input
                        type="submit"
                        value="Submit"
                        className="w-full p-4 rounded-md mt-5 cursor-pointer bg-blue_dark text-white"
                    />

                    <div className={'flex flex-row items-center justify-center mt-5 gap-5'}>
                        <div className={'w-[60px] h-[1px] bg-[#D9D9D9]'}></div>
                        <p className={'text-[#565656]'}>OR</p>
                        <div className={'w-[60px] h-[1px] bg-[#D9D9D9]'}></div>
                    </div>

                    <div className={'flex flex-row items-center justify-center mt-5 gap-5'}>
                        <SocialButton title={"Google"} image={google.src}/>
                        <SocialButton title={"Github"} image={github.src}/>
                    </div>

                    <p className={'self-center justify-self-center mt-3'}>Dont have an account? <a
                        href={'/auth/signup/'} className={'text-blue_dark font-bold'}>Signup</a></p>

                </form>
            </div>
        </section>
    );
}

export default Page;