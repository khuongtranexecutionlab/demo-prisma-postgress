'use client'

import React from 'react'

import { CiTrash } from 'react-icons/ci'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { IMenuResponse } from '@/global/types'
import Utils from '@/utils'

function Item({ data }: { data: IMenuResponse }) {
  const { increaseItemQuantity, decreaseItemQuantity, removeItem, toggleOpen } = useShoppingCart()

  let finalPrice = data?.price || 0

  finalPrice = Number(finalPrice.toFixed())

  const totalPrice = data.quantity! * finalPrice

  function handleClickPlus() {
    increaseItemQuantity(data)
  }

  function handleClickMinus() {
    decreaseItemQuantity(data)
  }

  function handleClickTrash() {
    removeItem(data.title)
  }

  if (!data)
    return (
      <div className="text-gray-400 relative shadow-md p-6 flex flex-col gap-2 bg-white rounded-2xl overflow-hidden">
        <div className="relative flex gap-2 items-center">
          <span className="animate-spin">
            <AiOutlineLoading3Quarters className="text-[1.25rem]" />
          </span>
          <p>Đang chuẩn bị...</p>
        </div>
      </div>
    )

  return (
    <article className="items">
      <div className="remove">
        <div className="title">
          <span>{data?.title}</span>
        </div>
        <button onClick={handleClickTrash} className="button_action">
          <CiTrash />
        </button>
      </div>
      <div className="info_item">
        <div>
          <span onClick={handleClickMinus} className="icons">
            <AiOutlineMinus />
          </span>
          <p>{data.quantity} Phần</p>
          <span onClick={handleClickPlus} className="icons">
            <AiOutlinePlus />
          </span>
        </div>
        <p className="text-[1.25rem]">{Utils.useFormatVND(totalPrice)}</p>
      </div>
    </article>
  )
}

export default Item
