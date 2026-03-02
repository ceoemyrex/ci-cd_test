import {Footer} from "@/components"
import { GetStarted, HowItWorksHero, Process } from "./components"
import { Steps } from "./components"
import { Testimonials } from "@/app/components"

export default function Page(){
    return(
        <>
        <HowItWorksHero/>
        <Steps/>
        <Process/>
        <Testimonials/>
        <GetStarted/>
        <Footer/>
        </>
    )
}