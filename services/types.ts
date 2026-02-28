/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseApiResponse<T=any>{
    responseStatus:boolean,
    responseMessage:string
    result:T
}