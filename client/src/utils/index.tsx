import React from 'react'
import * as Fetch from './fetch'

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
}

export default Utils
