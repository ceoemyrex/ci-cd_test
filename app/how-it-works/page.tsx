import {Footer} from "@/components"
import { GetStarted, HowItWorksHero, Process } from "./components"
import { Steps } from "./components"

export default function Page(){
    return(
        <>
        <HowItWorksHero/>
        <Steps/>
        <Process/>
        <GetStarted/>
        <Footer/>
        </>
    )
}