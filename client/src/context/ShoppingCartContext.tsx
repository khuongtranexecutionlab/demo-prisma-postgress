'use client'

import { createContext, useContext } from 'react'
import { useState, useEffect } from 'react'

interface ShoppingCartContextType {
  isOpenedForTheFirstTime: boolean
  isCounting: boolean
  items: any[]
  isOpen: boolean
  toggleOpen: () => void
  increaseItemQuantity: (name: string) => void
  decreaseItemQuantity: (name: string) => void
  removeItem: (id: number) => void
  clearItems: () => void
  deliveryPrice: number
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
  deliveryPrice: 0,
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
  const deliveryPrice = countDeliveryPrice()
  const totalPrice = isCounting ? '...' : totalItemsPrice + deliveryPrice

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))

    setIsCounting(true)
    countTotalItemsPrice()
  }, [items])

  function countDeliveryPrice() {
    let value = 2000

    if (totalItemsPrice >= 15000) {
      value = 0
    }

    return value
  }

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

  async function countTotalItemsPrice() {
    const initialValue = 0

    const value = await items.reduce(
      async (accumulatorPromise: any, item: { id: any; quantity: number }) => {
        const accumulator = await accumulatorPromise
        // const response = await getSmakById({ id: item.id })

        // if (!response) return accumulator

        // const data = JSON.parse(response)

        // if (data?.discountPercentage) {
        //   const discountAmount = (data.price * data.discountPercentage) / 100
        //   const finalPrice = (data.price - discountAmount).toFixed()

        //   return accumulator + Number(finalPrice) * item.quantity
        // } else {
        //   return accumulator + data?.price * item.quantity
        // }
      },
      Promise.resolve(initialValue)
    )

    setTotalItemsPrice(value)
    setIsCounting(false)
  }

  function toggleOpen() {
    if (!isOpenedForTheFirstTime) {
      setIsOpenedForTheFirstTime(true)
    }
    setIsOpen(!isOpen)
  }

  function removeItem(id: number) {
    setItems((currentItems: any[]) => {
      return currentItems.filter((item: { id: number }) => item.id !== id)
    })
  }

  function increaseItemQuantity(name: string) {
    setItems((currentItems: any[]) => {
      if (currentItems.find((item: { name: string }) => item.name === name) == null) {
        return [{ name, quantity: 1 }, ...currentItems]
      } else {
        return currentItems.map((item: { name: string; quantity: number }) => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseItemQuantity(name: string) {
    setItems((currentItems: any[]) => {
      const item = currentItems.find((item: { name: string }) => item.name === name)
      if (item && item.quantity === 1) {
        return currentItems.filter((item: { name: string }) => item.name !== name)
      } else {
        return currentItems.map((item: { name: string; quantity: number }) => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity - 1 }
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
        deliveryPrice,
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
