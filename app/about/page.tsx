import { Footer } from "@/components";
import { AboutHero, JoinUs, Services, Vision } from "./components";
import { Testimonials } from "../components";
import { ContentfulProvider } from "@/services";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Page(){

    const blogs = await ContentfulProvider.getBlogEntries();

    return(
        <>
        <AboutHero/>
        <Vision/>
        <Suspense>
            <Services blogs={blogs ?? []}/>
        </Suspense>
        <Testimonials theme="white"/>
        <JoinUs/>
        <Footer/>
        </>
    )
}