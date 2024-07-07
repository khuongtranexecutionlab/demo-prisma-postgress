'use client'
import React from 'react'
import Link from 'next/link'

interface INavItemProps {
  name: string
  route: string
  active: string
  setActive: Function
}

interface ComponentNavItem extends React.FC<INavItemProps> {}

const NavItem: ComponentNavItem = ({ name, route, active, setActive }) => {
  return active !== name ? (
    <Link href={route} legacyBehavior aria-label={`${name}`}>
      <span
        className="mx-2 cursor-pointer hover:border-b-4 hover:text-indigo-500"
        onClick={() => setActive(name)}
      >
        {name}
      </span>
    </Link>
  ) : null
}

export default NavItem
