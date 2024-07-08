import React from 'react'

interface SortDescriptor {
  column: string
  direction: 'ascending' | 'descending'
}

const useSortedItems = (items: any[], sortDescriptor: SortDescriptor) => {
  return React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])
}

export default useSortedItems
