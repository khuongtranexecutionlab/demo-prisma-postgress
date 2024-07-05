import Card from '@/components/Card'
import { IMenuResponse } from '@/global/types'
import { auth } from '@/utils/auth'
import { User } from 'next-auth'
import React from 'react'

interface IMenuProps {
  data: IMenuResponse[] | undefined
  auth: User | undefined
}

const Menu: React.FC<IMenuProps> = ({ auth, data }) => {
  return (
    <section className="warpper_menu">
      <div className="space-y-4">
        {data?.map((i, idx) => (
          <Card data={i} key={idx} userID={auth?.id} id={0} />
        ))}
      </div>
    </section>
  )
}

export default Menu
