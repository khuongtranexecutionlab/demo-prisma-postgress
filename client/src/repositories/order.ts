import Utils from '@/utils'

interface ICreateOrder {
  total: number
  items: { title: string; price: number }[]
}

export const createOrder = async (data: ICreateOrder, loading?: React.Dispatch<boolean>) => {
  let api = '/orders'
  if (loading) loading(true)
  let response = await Utils.call.post(api, { ...data }).finally(() => {
    if (loading) loading(false)
  })

  return response?.data
}
