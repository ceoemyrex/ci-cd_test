import {Footer} from "@/components"
import { GetStarted, HowItWorksHero, Process } from "./components"
import { Steps } from "./components"
import { Testimonials } from "@/app/components"
import { Locale } from "@/app/utils"

export default async function Page({params}:{
    params:Promise<{
        locale:Locale
    }>
}){

    const locale = (await params).locale

    return(
        <>
        <HowItWorksHero locale={locale} />
        <Steps locale={locale}/>
        <Process locale={locale}/>
        <Testimonials locale={locale}/>
        <GetStarted locale={locale}/>
        <Footer/>
        </>
    )
}