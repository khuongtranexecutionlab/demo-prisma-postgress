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

  Utils.useDidMount(
    () => {
      if (socket && auth) {
        socket?.emit('joinRoom', auth.id)
      }
    },
    undefined,
    [auth?.id]
  )
  return (
    <div className="wrapper-home">
      {!auth ? (
        <form action={doSocialLogin}>
          <button
            className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg"
            type="submit"
            name="action"
            value="google"
          >
            Sign In With Google
          </button>
        </form>
      ) : (
        <form action={doLogout}>
          <button className="bg-blue-400 my-2 text-white p-1 rounded" type="submit">
            Logout
          </button>
        </form>
      )}
      <div>{auth?.name}</div>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        {data?.map((i, idx) => (
          <Card data={i} key={idx} userID={auth?.id} />
        ))}
      </div>
    </div>
  )
}

export default Home
