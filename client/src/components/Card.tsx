export const dynamic = 'force-dynamic'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { IMenuResponse } from '@/global/types'
import { createOrder } from '@/repositories'
import React from 'react'

interface ICardProps {
  data: IMenuResponse | undefined
  id: number
  userID?: string
}

const Card: React.FC<ICardProps> = ({ data, userID }) => {
  const { increaseItemQuantity, isOpenedForTheFirstTime, toggleOpen } = useShoppingCart()
  const [isClicked, setIsClicked] = React.useState(false)

  function handleClick() {
    setIsClicked(true)
    increaseItemQuantity(data?.title!)

    if (!isOpenedForTheFirstTime) {
      toggleOpen()
    }

    // setTimeout(() => {
    //   setIsClicked(false)
    // }, timeout)
  }

  return (
    <div className="wrapper-card">
      <div className="card-img">
        <img src={data?.image} />
      </div>
      <div className="card-body">
        <h1 className="card-title">{data?.title}</h1>
        <div className="card-desc">{data?.description}</div>
        <div className="card-desc">{data?.price}</div>
      </div>
      {userID && <button onClick={handleClick}>Order</button>}
    </div>
  )
}

export default Card
