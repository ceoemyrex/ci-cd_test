import { Footer } from "@/components";
import { AboutHero, Services, Vision } from "./components";
import { Testimonials } from "../components";

export default function Page(){
    return(
        <>
        <AboutHero/>
        <Vision/>
        <Services/>
        <Testimonials theme="white"/>
        <Footer/>
        </>
    )
}