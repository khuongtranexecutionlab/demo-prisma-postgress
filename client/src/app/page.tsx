import { getMenu } from '@/repositories'
import ShoppingCart from './Cart'
import { IMenuResponse } from '@/global/types'

export default async function Home() {
  let response = [] as IMenuResponse[] | undefined
  try {
    response = await getMenu()
  } catch (error) {
    console.log(error)
  }

  if (!response) return null

  return <ShoppingCart />
}
