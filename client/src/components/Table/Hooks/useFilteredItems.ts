import React from 'react'
import { statusOptions, users } from '../data'

const useFilteredItems = (filterValue: string, statusFilter: string, hasSearchFilter: boolean) => {
  return React.useMemo(() => {
    let filteredUsers = [...users]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) => Array.from(statusFilter).includes(user.status))
    }

    return filteredUsers
  }, [filterValue, statusFilter])
}

export default useFilteredItems
