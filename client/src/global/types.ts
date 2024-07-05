import { Session } from 'next-auth'

export interface IMenuResponse {
  title: string
  image: string
  description: string
  price?: number
}

export type IUser = Session & {
  accessToken: string
  role: boolean
}
