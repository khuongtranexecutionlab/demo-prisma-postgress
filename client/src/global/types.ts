import { Session } from "next-auth"

export interface IMenuResponse {
    title:string,
    image:string,
    description:string
}

export type IUser = Session &{
    accessToken: string,
    role : boolean
}