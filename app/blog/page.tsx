import { Footer } from "@/components";
import { BlogHero } from "./components";
import { Blogs,ReadyToMove } from "../components";

export default function Page(){
    return (
    <>
    <BlogHero/>
    <Blogs showCta={false}/>
    <ReadyToMove/>
    <Footer/>
    </>
    )
}