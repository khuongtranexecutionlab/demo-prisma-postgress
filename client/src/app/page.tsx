import { getMenu } from '@/repositories'
import Home from '@/screen/Home'
import { IMenuResponse, IUser } from '@/global/types'
import { auth } from '@/utils/auth'
import ServiceContextProvider from './context/Socket'
import { ENDPOINT_SERVICE } from '@/global/constant'
import Utils from '@/utils'

export default async function app() {
  let response = [] as IMenuResponse[] | undefined
  try {
    response = await getMenu()
  } catch (error) {
    console.log(error)
  }
  if (!response) return null
  const session = (await auth()) as IUser
  return (
    <ServiceContextProvider https={ENDPOINT_SERVICE} author={session} isProduction={false}>
      <Home data={Utils.useGenerateData(response)} auth={session?.user} />
    </ServiceContextProvider>
  )
}
