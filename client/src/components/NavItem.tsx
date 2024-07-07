'use client'
import React from 'react'
import Link from 'next/link'

interface INavItemProps {
  name: string
  route: string
}

interface ComponentNavItem extends React.FC<INavItemProps> {}

const NavItem: ComponentNavItem = ({ name, route }) => {
  return (
    <Link href={route} legacyBehavior aria-label={`${name}`}>
      <span className="mx-2 cursor-pointer hover:border-b-4 hover:text-indigo-500">{name}</span>
    </Link>
  )
}

export default NavItem
