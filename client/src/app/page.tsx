import { getMenu } from '@/repositories'
import Home from '@/screen/Home'
import { IMenuResponse } from '@/global/types'
import { auth } from '@/utils/auth'

export default async function app() {
  let response = [] as IMenuResponse[] | undefined
  try {
    response = await getMenu()
  } catch (error) {
    console.log(error)
  }

  if (!response) return null
  const session = await auth()
  return <Home data={response} auth={session?.user} />
}
