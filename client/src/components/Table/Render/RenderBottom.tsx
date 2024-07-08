import { Pagination } from '@nextui-org/react'
import React from 'react'

interface IProps {
  page: number
  setPage: Function
  selectedKeys: any
  items: any
  hasSearchFilter: boolean
  pages: number
}

export const useRenderBottom = (props: IProps) => {
  const { page, pages, setPage, selectedKeys, items, hasSearchFilter } = props

  return React.useMemo(() => {
    return (
      <div className="py-3 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage as any}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])
}
