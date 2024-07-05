'use client'

import Image from 'next/image'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'

import Delivery from './Delivery'
import Item from './Item'

import { MdOutlineShoppingCart, MdClose } from 'react-icons/md'

import BottomRightShoppingCartIcon from './BottomRightShoppingCartIcon'
import { useShoppingCart } from '@/context/ShoppingCartContext'

function ShoppingCart() {
  const router = useRouter()
  const pathname = usePathname()

  const [isClicked, setIsClicked] = React.useState(false)

  const { isCounting, items, isOpen, toggleOpen, totalPrice, totalItemsCount, deliveryPrice } =
    useShoppingCart()

  const formattedTotalPrice =
    typeof totalPrice == 'number' ? (totalPrice / 100).toFixed(2) : totalPrice

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      document.body.classList.add('lg:overflow-auto')
    } else {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('lg:overflow-auto')
    }
  }, [isOpen])

  async function handleButtonClick() {
    setIsClicked(false)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/*Blur background*/}
            <motion.div
              onClick={toggleOpen}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="hidden cursor-pointer bg-[rgba(0,0,0,0.4)] fixed inset-0 z-40 backdrop-blur-md p-4 lg:flex justify-end"
            ></motion.div>
            {/*Shopping Cart Wrapper*/}
            <motion.div
              className="fixed z-40 w-full lg:w-2/5 h-full right-0 top-0 lg:p-4"
              initial={{
                x: '100%',
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '100%',
              }}
            >
              <aside className="bg-white h-full flex flex-col lg:rounded-2xl">
                {/*Heading*/}
                <div className="flex justify-between px-4 py-3 lg:p-6 shrink-0">
                  <div className="flex items-center gap-2 grow text-[1.5rem]">
                    <MdOutlineShoppingCart />
                    Đơn Hàng
                  </div>
                  {/*Close Icon*/}
                  <button
                    onClick={toggleOpen}
                    className="hover:bg-gray-100 active:bg-gray-200 transition active:shadow-inner bg-white w-[3rem] h-[3rem] text-[1.5rem] flex justify-center items-center rounded-full"
                  >
                    <MdClose />
                  </button>
                </div>
                <AnimatePresence mode="popLayout">
                  {items.length ? (
                    <motion.div
                      className="flex flex-col grow overflow-hidden"
                      key="listOfItems"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      {/*List of items*/}
                      <ul className="shadow-inner p-2 lg:p-6 flex flex-col gap-2 lg:gap-4 bg-gray-100 overflow-y-auto overflow-x-hidden grow">
                        <AnimatePresence mode="popLayout">
                          <li key={'delivery'}>
                            <Delivery price={deliveryPrice} />
                          </li>
                          {items.map((item, idx) => (
                            <motion.li
                              layout
                              key={item.id}
                              initial={{
                                scale: 0,
                              }}
                              animate={{
                                scale: 1,
                              }}
                              exit={{
                                scale: 0,
                              }}
                            >
                              <Item name={item.name} quantity={item.quantity} />
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                      {/*Bottom*/}
                      <div className="flex flex-col gap-4 px-4 py-3 lg:p-6 shrink-0">
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <p>Suma łącznie:</p>
                            <p className="text-[1.25rem]">{formattedTotalPrice} zł</p>
                          </div>
                          <div className="flex justify-between text-sm text-gray-400">
                            <p>Ilość:</p>
                            <p>{totalItemsCount} szt.</p>
                          </div>
                        </div>
                        <Button
                          disabled={isClicked || isCounting}
                          appearance="fill"
                          onClick={handleButtonClick}
                          className="flex gap-2 items-center justify-center"
                        >
                          {isClicked ? (
                            <>
                              <span className="animate-spin text-[1.25rem]">
                                <AiOutlineLoading3Quarters />
                              </span>
                              <p>Chờ xíu</p>
                            </>
                          ) : (
                            <>
                              <p>Thanh toán </p>
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="emptyCard"
                      className="flex justify-center items-center h-full w-full"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      Giỏ hàng trống
                    </motion.div>
                  )}
                </AnimatePresence>
              </aside>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/*Shopping cart Icon*/}
      <BottomRightShoppingCartIcon />
    </>
  )
}

export default dynamic(() => Promise.resolve(ShoppingCart), { ssr: false })
