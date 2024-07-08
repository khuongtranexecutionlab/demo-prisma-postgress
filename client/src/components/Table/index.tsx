'use client'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { users } from './data'
import { useRenderBottom } from './Render/RenderBottom'
import { useRenderCell } from './Render/RenderCells'
import { useRenderTop } from './Render/RenderTop'
import useFilteredItems from './Hooks/useFilteredItems'
import useHeaderColumns from './Hooks/useHeaderColumns'
import useItems from './Hooks/useItems'
import useSortedItems from './Hooks/useSortedItems'

const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'status', 'actions']

export interface IUser {
  id: number
  name: string
  email: string
  role: string
  team: string
  status: string
  age: string
  [key: string]: string | number
}

interface SortDescriptor {
  column: string
  direction: 'ascending' | 'descending'
}

const List = () => {
  const [filterValue, setFilterValue] = React.useState<string>('')
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  })
  const hasSearchFilter = Boolean(filterValue)

  const [page, setPage] = React.useState<number>(1)

  const headerColumns = useHeaderColumns(visibleColumns)
  const filteredItems = useFilteredItems(filterValue, statusFilter, hasSearchFilter)
  const items = useItems(page, rowsPerPage, filteredItems)
  const sortedItems = useSortedItems(items, sortDescriptor)
  const pages = Math.ceil(users.length / rowsPerPage)

  const renderCell = useRenderCell()

  const topContent = useRenderTop({
    filterValue,
    setFilterValue,
    setStatusFilter,
    statusFilter,
    setVisibleColumns,
    visibleColumns,
    setPage,
    setRowsPerPage,
    hasSearchFilter,
  })

  const bottomContent = useRenderBottom({
    page,
    setPage,
    selectedKeys,
    items,
    hasSearchFilter,
    pages,
  })

  return (
    <Table
      isCompact
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
      classNames={{
        base: ['overflow-y-scroll'],
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
      onSortChange={setSortDescriptor as any}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default dynamic(() => Promise.resolve(List), { ssr: false })
