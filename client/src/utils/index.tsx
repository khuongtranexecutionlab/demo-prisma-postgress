import React from 'react'
import * as Fetch from './fetch'
import { IMenuResponse } from '@/global/types'

export interface WindowDimentions {
  width: number
  height: number
}
export interface WindowEvent<TypeMessageKey, IData> extends Event {
  data: WindowEventData<TypeMessageKey, IData>
}
export interface WindowEventData<TypeMessageKey, IData> {
  key: TypeMessageKey
  data: IData
}

export interface INotice {
  title?: string
  body?: string
}

export interface IUtils {
  call: {
    get: typeof Fetch.Get
    post: typeof Fetch.Post
    put: typeof Fetch.Put
    delete: typeof Fetch.Delete
    head: typeof Fetch.Head
    exec: typeof Fetch.Call
    method: typeof Fetch.Method
  }
  useDidMount: (
    didMount: React.EffectCallback,
    didUnmount?: React.EffectCallback,
    deps?: React.DependencyList
  ) => void
  useReducer: <T>(reducer: (state: T, newState: T) => T, initialState?: T) => [T, React.Dispatch<T>]
  useDebounce: <T>(value: T, delay: number, callback: (value?: T) => Promise<void> | void) => void
  useFormatVND: (price: number) => string
  useGenerateData: (data: IMenuResponse[]) => IMenuResponse[]
}
const Utils: IUtils = {
  call: {
    get: Fetch.Get,
    post: Fetch.Post,
    put: Fetch.Put,
    delete: Fetch.Delete,
    head: Fetch.Head,
    exec: Fetch.Call,
    method: Fetch.Method,
  },

  useDidMount: (
    didMount: React.EffectCallback,
    didUnmount?: React.EffectCallback,
    deps?: React.DependencyList
  ) => {
    React.useEffect(() => {
      if (didMount) didMount()

      return () => {
        if (didUnmount) didUnmount()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps ?? [])
  },
  useReducer: function <T>(reducer: (state: T, newState: T) => T, initialState?: T) {
    return React.useReducer(reducer, initialState ?? (undefined as T))
  },
  useDebounce: function <T>(
    value: T,
    delay: number,
    callback: (value?: T) => Promise<void> | void
  ) {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
      const handler = setTimeout(async () => {
        setDebouncedValue(value)
        await callback(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  },
  useFormatVND: (price: number) => {
    const formattedPrice = Number(price).toFixed(0)
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫'
  },
  useGenerateData: (data: IMenuResponse[]) => {
    const response = data
      .filter((i) => !i.title.startsWith('Đồ ăn thêm') && !i.title.startsWith('Cơm thêm'))
      .map((i) => ({
        title: i.title,
        description: i.description,
        image: i.image,
        price: i.title === 'Trứng ốp la' ? 5000 : 30000,
      }))
    const newArr = [
      ...response,
      {
        title: 'Salad trộn dầu giấm ăn kèm',
        description: '',
        image: 'assests/sallad.webp',
        price: 15000,
      },
    ]
    return newArr
  },
}

export default Utils
