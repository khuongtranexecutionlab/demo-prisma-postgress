'use client'

import Image from 'next/image'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'

import Item from './Item'

import { MdOutlineShoppingCart, MdClose } from 'react-icons/md'

import BottomRightShoppingCartIcon from './BottomRightShoppingCartIcon'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import Utils from '@/utils'

function ShoppingCart() {
  const [isClicked, setIsClicked] = React.useState(false)

  const { isCounting, items, isOpen, toggleOpen, totalPrice, totalItemsCount } = useShoppingCart()

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
    <div className="wrapper_cart">
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
              className="toggle"
            />
            {/*Shopping Cart Wrapper*/}
            <motion.div
              className="content"
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
              <aside>
                {/*Heading*/}
                <div className="heading">
                  <div className="order-title">
                    <MdOutlineShoppingCart />
                    Đơn Hàng
                  </div>
                  {/*Close Icon*/}
                  <button onClick={toggleOpen}>
                    <MdClose />
                  </button>
                </div>
                <AnimatePresence mode="popLayout">
                  {items.length ? (
                    <motion.div
                      className="wrapper_list"
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
                      <ul>
                        <AnimatePresence mode="popLayout">
                          {items.map((item, idx) => (
                            <motion.li
                              layout
                              key={item.title}
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
                              <Item data={item} />
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                      {/*Bottom*/}
                      <div className="bottom">
                        <div className="order_infor">
                          <div className="total">
                            <p>Tổng:</p>
                            <p className="text-[1.25rem]">
                              {Utils.useFormatVND(Number(totalPrice))}{' '}
                            </p>
                          </div>
                          <div className="quantity">
                            <p>Số lượng:</p>
                            <b>{totalItemsCount}</b>
                          </div>
                        </div>
                        <Button
                          disabled={isClicked || isCounting}
                          appearance="fill"
                          onClick={handleButtonClick}
                          className="button_action"
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
    </div>
  )
}

export default dynamic(() => Promise.resolve(ShoppingCart), { ssr: false })
