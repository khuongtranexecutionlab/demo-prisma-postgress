'use client'
import { IUser } from '@/global/types'
import NavItem from './NavItem'
import React from 'react'
import { doLogout, doSocialLogin } from '@/app/actions'
import { headers } from 'next/headers'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
export default function Navbar() {
  const { data: session, update } = useSession()
  // useState and useEffect are used to only render the UI
  // after the session is retrieved
  const [data, setData] = React.useState<IUser | undefined>(undefined)

  React.useEffect(() => {
    if (session && session.user) {
      setData(session as IUser)
    }
  }, [session])

  return (
    <div className="flex justify-between px-5 py-3 my-3">
      <div className="flex gap-2">
        <span className="text-xl font-bold text-blue-800 dark:text-violet-300 border-b-4 border-green dark:border-violet-200 md:text-2xl">
          {data?.user?.name}
        </span>
        {!data ? (
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
          <form
            action={() => {
              doLogout()
              setData(undefined)
            }}
          >
            <button className="bg-blue-400 my-2 text-white p-1 rounded" type="submit">
              Logout
            </button>
          </form>
        )}
      </div>

      <div className="flex space-x-5 text-lg ">
        <NavItem route="/history" name="Lịch sử" />
        <NavItem route="/projects" name="Thanh toán" />
      </div>
    </div>
  )
}
