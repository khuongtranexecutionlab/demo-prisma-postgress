import React from 'react'
import {
  User as NextUser,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { IUser } from '..'
import { HiDotsVertical } from 'react-icons/hi'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
}

export const useRenderCell = () => {
  return React.useCallback((user: IUser, columnKey: string) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <NextUser
            classNames={{
              description: 'text-default-500',
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </NextUser>
        )
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
          </div>
        )
      case 'status':
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={(statusColorMap as any)[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <HiDotsVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue
    }
  }, [])
}
