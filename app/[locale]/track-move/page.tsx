import { Footer } from "@/components";
import { TrackMoveHero } from "./components";
import { Locale } from "@/app/utils";

export default async function Page({params}:{
   params:Promise<{
      locale:Locale
   }>
}){

   const paramsRes = await params

   return(
     <>
    <TrackMoveHero locale={paramsRes.locale}/>
    <Footer/>
    </>
   )
}