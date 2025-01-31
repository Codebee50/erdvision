
"use client"
import React, { useEffect } from 'react';
import LogoText from "@/components/LogoText";
import SampleTabs from '@/public/images/sample-tabs.svg'
import Image from "next/image";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import SocialButton from "@/components/SocialButton";
import google from '@/public/images/icons/google.png'
import github from '@/public/images/icons/github.png'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@/features/auth/authActions';
import { useRouter } from 'next/navigation';
import LoadableButton from '@/components/LoadableButton';
import { toast } from '@/hooks/use-toast';
import { APP_CONFIG } from '@/constants/constants';
import userImage from "@/public/images/user.png";
import { useSearchParams } from 'next/navigation';



function Page(props) {
    const {loading, userInfo, error, success, isAuthenticated} = useSelector((state)=> state.auth)


    const dispatch = useDispatch()

    const router = useRouter()
    const searchParams = useSearchParams()

    const nextPage = searchParams.get('next')
    console.log(nextPage?nextPage: '/')
    error && toast({
        title: 'Login failed',
        description: error,
        variant: 'destructive'
    })

    if(success){
        toast({
            title: 'Success',
            description: `Login successful, welcome back to ${APP_CONFIG.name}`
        })

        const route = nextPage? nextPage: '/'   
        router.push(route)
    }


    useEffect(()=>{
        if(userInfo){
            router.push(nextPage? nextPage: '/' )
        }
    }, [userInfo])

    const handleFormSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        dispatch(userLogin({email, password}))
    }

    return (
        <section className={'w-screen h-screen flex max-[1020px]:flex-col flex-row bg-white'}>
            <div className={'max-[1020px]:w-full w-[40%] bg-green01 flex flex-col p-9 gap-3 relative'}>
                <LogoText/>

                <Image src={SampleTabs.src} alt={'Erd vision'} width={200} height={200} layout={'responsive'} className={'w-auto'}/>


                <h1 className="text-green02 font-semibold  text-[2.2rem] leading-[1.2] mt-5 max-[450px]:text-[2.2rem]">
                    Welcome back!
                </h1>
                <p className={'text-mgrey100 text-sm max-sm:text-[0.8rem]'}>Every minute you spend in planning saves 10 minutes in execution; this gives you a 1,000 percent return on energy.</p>
            </div>

            <div className={'max-[1020px]:w-full w-[60%] bg-white flex flex-col p-10 sm:p-16 md:p-32 justify-center'}>
                <h1 className="text-black font-bold text-3xl">Login</h1>
                <form className={'mt-5 w-full'} onSubmit={handleFormSubmit}>
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        conClassName="mt-6"
                        id='email-input'
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        conClassName="mt-6"
                        id='password-input'
                    />

                    {/* <div className={'w-full flex items-end justify-end mt-5'}>
                        <Link href={"/auth/password/reset"} className={'text-green02 font-semibold'}>Forgot
                            password?</Link>
                    </div> */}
                    <LoadableButton isLoading={loading} label='Submit'/>
                    {/* <div className={'flex flex-row items-center justify-center mt-5 gap-5'}>
                        <div className={'w-[60px] h-[1px] bg-[#D9D9D9]'}></div>
                        <p className={'text-[#565656]'}>OR</p>
                        <div className={'w-[60px] h-[1px] bg-[#D9D9D9]'}></div>
                    </div> */}

                    {/* <div className={'flex flex-row items-center justify-center mt-5 gap-5'}>
                        <SocialButton title={"Google"} image={google.src}/>
                        <SocialButton title={"Github"} image={github.src}/>
                    </div> */}

                    <p className={'self-center justify-self-center mt-3'}>Dont have an account? <a
                        href={'/auth/signup/'} className={'text-blue_dark font-bold'}>Sign up</a></p>

                </form>
            </div>
        </section>
    );
}

export default Page;