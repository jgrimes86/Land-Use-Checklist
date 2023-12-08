import React, { useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, } from '@tanstack/react-table';
import { Table, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react';

function TaskTable({user}) {

    const [data, setData] = useState([
        {
            projectName: "",
            start_date: "",
            end_date: "",
            status: "",
        }
    ])

    useMemo(() => {
        fetch('/tasks/users/'+user.id)
        .then((r) => r.json())
        .then(data => setData(data.map(task => {
            return {
                projectName: task.project.name,
                start_date: task.start_date,
                end_date: task.end_date,
                status: task.status            
            }
        })))
    }, [])

    const columnHelper = createColumnHelper()

    const columns = useMemo(
        () => [
            columnHelper.accessor('projectName', {
                id: 'projectName',
                cell: info => info.getValue(),
                header: () => 'Project Name',
            }),
            columnHelper.accessor('start_date', {
                id: 'start_date',
                cell: info => info.getValue(),
                header: () => 'Start Date',
            }),
            columnHelper.accessor('end_date', {
                id: 'end_date',
                cell: info => info.getValue(),
                header: () => 'Due Date',
            }),
            columnHelper.accessor('status', {
                id: 'status',
                cell: info => info.getValue(),
                header: () => 'Status',
            })
        ], []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })

    return (
        <div>
            <div>Sortable Table</div>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => {
                                return (
                                    <Th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted().toString()] ?? null}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map(row => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </div>)
}

export default TaskTable