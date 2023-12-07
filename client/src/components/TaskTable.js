import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react';

function TaskTable() {

    const data = useMemo(
        () => [
        {
            first_name: "John",
            last_name: "Doe",
        },
        {
            first_name: "Sally",
            last_name: "Mae",
        },
        {
            first_name: "Freddie",
            last_name: "Mac",
        },
        ], []
    );

    const columns = useMemo(
        () => [
        {
            Header: 'First Name',
            accessor: 'first_name',
        },
        {
            Header: 'Last Name',
            accessor: 'last_name'
        }
        ], []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
          data,
          columns,
        },
        useSortBy
    )

    return (
        <Table {...getTableProps()}>
            <Thead>
                {headerGroups.map(headerGroup => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {/* <span>
                                    {column.isSorted ? (column.isSortedDesc? ' 🔽' : ' 🔼') : ' '}
                                </span> */}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <Td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </Td>
                                })}
                            </Tr>
                        )
                    }
                )}
            </Tbody>
        </Table>
    )   
}

export default TaskTable