import { getMenu } from '@/repositories'
import Home from '@/screen/home'
import { IMenuResponse, IUser } from '@/global/types'
import { auth } from '@/utils/auth'
import ServiceContextProvider from './context/Socket'
import { ENDPOINT_SERVICE } from '@/global/constant'

export default async function app() {
  let response = [] as IMenuResponse[] | undefined
  try {
    response = await getMenu()
    if (response)
      response.push({
        title: 'Salad trộn dầu giấm ăn kèm',
        description: '',
        image: 'assests/sallad.webp',
      })
  } catch (error) {
    console.log(error)
  }
  if (!response) return null
  const session = (await auth()) as IUser
  return (
    <ServiceContextProvider https={ENDPOINT_SERVICE} author={session} isProduction={false}>
      <Home
        data={response
          .filter((i) => !i.title.startsWith('Đồ ăn thêm') && !i.title.startsWith('Cơm thêm'))
          .map((i) => ({
            title: i.title,
            description: i.description,
            image: i.image,
            price:
              i.title === 'Trứng ốp la'
                ? 5000
                : i.title === 'Salad trộn dầu giấm ăn kèm'
                ? 15000
                : 30000,
          }))}
        auth={session?.user}
      />
    </ServiceContextProvider>
  )
}
