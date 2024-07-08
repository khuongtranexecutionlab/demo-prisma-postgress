import React from 'react'

const useItems = (page: number, rowsPerPage: number, filteredItems: any) => {
  return React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])
}

export default useItems
