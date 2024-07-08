import React from 'react'
import { columns } from '../data'

const useHeaderColumns = (visibleColumns: Set<string>) => {
  return React.useMemo(() => {
    if ((visibleColumns as unknown as string) === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])
}

export default useHeaderColumns
