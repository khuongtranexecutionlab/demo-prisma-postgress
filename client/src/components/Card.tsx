export const dynamic = 'force-dynamic'
import { IMenuResponse } from '@/global/types'
import { createOrder } from '@/repositories'
import React from 'react'

interface ICardProps {
  data: IMenuResponse | undefined
  userID?: string
}

const Card: React.FC<ICardProps> = ({ data, userID }) => {
  return (
    <div className="wrapper-card">
      <div className="card-img">
        <img src={data?.image} />
      </div>
      <div className="card-body">
        <h1 className="card-title">{data?.title}</h1>
        <div className="card-desc">{data?.description}</div>
      </div>
      {userID && (
        <button
          onClick={() =>
            createOrder({
              title: data!.title,
              content: data!.description,
              price: 30000,
              user_id: userID,
            })
          }
        >
          Order
        </button>
      )}
    </div>
  )
}

export default Card
