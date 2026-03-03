import {Footer} from "@/components"
import {ContactHero} from "./components"
import { Locale } from "@/app/utils"

export default async function Page({params}:{
    params:Promise<{
        locale:Locale
    }>
}){
    const locale = (await params).locale

    return(
        <>
        <ContactHero locale={locale}/>
        <Footer/>
        </>
    )
}