import { Footer } from "@/components";
import { AboutHero, JoinUs, Services, Vision } from "./components";
import { Testimonials } from "@/app/components";
import { ContentfulProvider } from "@/services";
import { Suspense } from "react";
import { Locale } from "@/app/utils";

export const revalidate = 60;

export default async function Page({params}:{
    params:Promise<{
        locale:Locale
    }>
}){

    const blogs = await ContentfulProvider.getBlogEntries();
    const locale = (await params).locale

    return(
        <>
        <AboutHero locale={locale}/>
        <Vision locale={locale}/>
        <Suspense>
            <Services locale={locale} blogs={blogs ?? []}/>
        </Suspense>
        <Testimonials locale={locale} theme="white"/>
        <JoinUs locale={locale}/>
        <Footer/>
        </>
    )
}