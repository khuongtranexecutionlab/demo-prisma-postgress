'use client'
import { doSocialLogin, doLogout } from '@/app/actions'
import Card from '@/components/Card'
import { IMenuResponse } from '@/global/types'
import React from 'react'
import { type User } from 'next-auth'
import Utils from '@/utils'
import { useServiceContext } from '@/app/context/Socket'
import { ENDPOINT_SERVICE } from '@/global/constant'

interface IHomeProps {
  data: IMenuResponse[] | undefined
  auth: User | undefined
}

const Home: React.FC<IHomeProps> = ({ data, auth }) => {
  const { socket } = useServiceContext()

  // Utils.useDidMount(
  //   () => {
  //     if (socket && auth) {
  //       socket?.emit('joinRoom', auth.id)
  //     }
  //   },
  //   undefined,
  //   [auth?.id]
  // )
  return (
    <main className="wrapper_home">
      <section className="wrapper_menu">
        {data?.map((i, idx) => (
          <Card data={i} key={idx} userID={auth?.id} id={0} />
        ))}
      </section>
    </main>
  )
}

export default Home
