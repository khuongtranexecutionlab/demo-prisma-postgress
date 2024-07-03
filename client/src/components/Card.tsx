import { IMenuResponse } from '@/global/types'
import React from 'react'

interface ICardProps {
  data: IMenuResponse | undefined
}

const Card: React.FC<ICardProps> = ({ data }) => {
  return (
    <div className="wrapper-card">
      <div className="card-img">
        <img src={data?.image} />
      </div>
      <div className="card-body">
        <h1 className="card-title">{data?.title}</h1>
        <div className="card-desc">{data?.description}</div>
      </div>
      <button>Order</button>
    </div>
  )
}

export default Card
