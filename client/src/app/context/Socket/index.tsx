'use client'
import React from 'react'
import { createContext, ReactNode, useContext } from 'react'
import { Socket } from 'socket.io-client'
import { Session } from 'next-auth'
import { useSocket } from './hook'
import { IUser } from '@/global/types'

export interface IServiceContextState {
  socket: Socket | undefined
}

const ServiceContext = createContext<IServiceContextState>({
  socket: undefined,
})

interface IServiceContextProviderProps {
  children: ReactNode
  https: string
  author: IUser | null
  isProduction?: boolean
}

export interface ComponentService extends React.FC<IServiceContextProviderProps> {}

const ServiceContextProvider: ComponentService = ({ children, https, author, isProduction }) => {
  const socket = useSocket(
    `w${isProduction ? 'ss' : 's'}://${https}`,
    {
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      autoConnect: false,
      timeout: 1000,
      forceNew: true,
      withCredentials: true,
    },
    author?.user
  )

  return <ServiceContext.Provider value={{ socket }}>{children}</ServiceContext.Provider>
}

export const useServiceContext = () => useContext(ServiceContext)

export default ServiceContextProvider
