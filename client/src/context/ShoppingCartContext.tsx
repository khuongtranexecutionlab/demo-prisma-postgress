'use client'

import { IMenuResponse } from '@/global/types'
import { createContext, useContext } from 'react'
import { useState, useEffect } from 'react'

interface ShoppingCartContextType {
  isOpenedForTheFirstTime: boolean
  isCounting: boolean
  items: IMenuResponse[]
  isOpen: boolean
  toggleOpen: () => void
  increaseItemQuantity: (data: IMenuResponse) => void
  decreaseItemQuantity: (data: IMenuResponse) => void
  removeItem: (title: string) => void
  clearItems: () => void
  totalItemsPrice: number
  totalItemsCount: number
  totalPrice: number | string
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  isOpenedForTheFirstTime: false,
  isCounting: true,
  items: [],
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleOpen: (id?: string) => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  removeItem: () => {},
  clearItems: () => {},
  totalItemsPrice: 0,
  totalItemsCount: 0,
  totalPrice: '0',
})

interface IShoppingCartProps {
  children: React.ReactNode
}

const cartItemsFromLocalStorage =
  typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartItems') || '[]') : []

export function ShoppingCartProvider({ children }: IShoppingCartProps) {
  const [isOpenedForTheFirstTime, setIsOpenedForTheFirstTime] = useState<boolean>(false)

  const [items, setItems] = useState(cartItemsFromLocalStorage)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [totalItemsPrice, setTotalItemsPrice] = useState<number>(0)
  const [isCounting, setIsCounting] = useState<boolean>(true)

  const totalItemsCount = countTotalItems()
  const totalPrice = isCounting ? '...' : totalItemsPrice

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))

    setIsCounting(true)
    countTotalItemsPrice()
  }, [items])

  function clearItems() {
    setItems([])
  }

  function countTotalItems() {
    let value = 0

    items.map((item: { quantity: number }) => {
      value += item.quantity
    })

    return value
  }

  function countTotalItemsPrice() {
    const initialValue = 0

    const value = items.reduce((accumulatorPromise: number, item: IMenuResponse) => {
      const accumulator = accumulatorPromise
      const a = accumulator + item.price! * item.quantity!
      return a
    }, initialValue)

    setTotalItemsPrice(value)
    setIsCounting(false)
  }

  function toggleOpen() {
    if (!isOpenedForTheFirstTime) {
      setIsOpenedForTheFirstTime(true)
    }
    setIsOpen(!isOpen)
  }

  function removeItem(title: string) {
    setItems((currentItems: IMenuResponse[]) => {
      return currentItems.filter((item) => item.title !== title)
    })
  }

  function increaseItemQuantity(data: IMenuResponse) {
    setItems((currentItems: IMenuResponse[]) => {
      if (currentItems.find((item) => item.title === data.title) == null) {
        return [{ ...data, quantity: 1 }, ...currentItems]
      } else {
        return currentItems.map((item) => {
          if (item.title === data.title) {
            return { ...item, quantity: item.quantity! + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseItemQuantity(data: IMenuResponse) {
    setItems((currentItems: IMenuResponse[]) => {
      const item = currentItems.find((item) => item.title === data.title)
      if (item && item.quantity === 1) {
        return currentItems.filter((item) => item.title !== data.title)
      } else {
        return currentItems.map((item) => {
          if (item.title === data.title) {
            return { ...item, quantity: item.quantity! - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpenedForTheFirstTime,
        isCounting,
        items,
        isOpen,
        toggleOpen,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        clearItems,
        totalItemsPrice,
        totalItemsCount,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
