import { Suspense } from "react";
import { BookMoveForm, PageContainer } from "./components";

export default function Page(){
    return(
        <PageContainer>
            <Suspense>
                <BookMoveForm/>
            </Suspense>
        </PageContainer>
    )
}