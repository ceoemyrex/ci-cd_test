import {Footer} from "@/components"
import { FAQHero } from "./components"
import { Testimonials } from "@/app/components"
import { StillHaveQuestions } from "./components/StillHaveQuestions"
import { Locale } from "@/app/utils"

export default async function Page({params}:{
    params:Promise<{
        locale:Locale
    }>
}){

    const locale = (await params).locale

    return(
        <>
        <FAQHero/>
        <Testimonials locale={locale}/>
        <StillHaveQuestions locale={locale}/>
        <Footer/>
        </>
    )
}
