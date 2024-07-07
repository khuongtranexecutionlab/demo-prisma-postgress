export const dynamic = 'force-dynamic'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { IMenuResponse } from '@/global/types'
import Utils from '@/utils'
import React from 'react'

interface ICardProps {
  data: IMenuResponse | undefined
  id: number
  userID?: string
}

const Card: React.FC<ICardProps> = ({ data, userID }) => {
  const { increaseItemQuantity, isOpenedForTheFirstTime, toggleOpen } = useShoppingCart()

  function handleClick() {
    increaseItemQuantity(data!)

    if (!isOpenedForTheFirstTime) {
      toggleOpen()
    }
  }

  return (
    <div className="wrapper_card">
      <div className="image">
        <img src={data?.image} alt="food-image" />
      </div>
      <div className="p-6">
        <h5 className="title">{data?.title}</h5>
      </div>
      {userID && (
        <div className="action">
          <button type="button" onClick={handleClick}>
            Order
          </button>
          <i className="hidden xl:block">{Utils.useFormatVND(data?.price!)}</i>
        </div>
      )}
    </div>
  )
}

export default Card
