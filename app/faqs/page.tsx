import {Footer} from "@/components"
import { FAQHero } from "./components"
import { Testimonials } from "../components"
import { StillHaveQuestions } from "./components/StillHaveQuestions"

export default function Page(){
    return(
        <>
        <FAQHero/>
        <Testimonials/>
        <StillHaveQuestions/>
        <Footer/>
        </>
    )
}