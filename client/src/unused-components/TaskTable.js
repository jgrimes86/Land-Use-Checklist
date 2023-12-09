import React, { useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, } from '@tanstack/react-table';
import { Table, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react';

import { useFormik } from "formik";
import { Button, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Textarea, useDisclosure } from '@chakra-ui/react';


function TaskTable({user}) {

    //////////////////////////// VARIABLES FOR TABLE ///////////////////////
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
                id: task.id,
                projectName: task.project.name,
                start_date: task.start_date,
                end_date: task.end_date,
                status: task.status,
                comments: task.comments
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
    ////////////////////////  END OF VARIABLES FOR TABLE ///////////////////

    /////////////////////// VARIABLES AND FUNCTIONS FOR MODAL ////////////////
    // const { isOpen, onOpen, onClose } = useDisclosure()

    // const formik = useFormik({
    //     initialValues: {
    //         name: task.name,
    //         description: task.description,
    //         start_date: task.start_date,
    //         end_date: task.end_date,
    //         status: task.status,
    //         comments: task.comments,
    //     },

    //     onSubmit: (values) => {
    //         fetch(`/tasks/${task.id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //               },
    //               body: JSON.stringify(values, null, 2),
    //         })
    //         .then((r) => {
    //             if (r.ok) {
    //                 r.json()
    //                 .then((updatedTask) => {
    //                     setUserTasks(userTasks.map(task => {
    //                         if (updatedTask.id === task.id) {
    //                             return updatedTask
    //                         } else return task
    //                     }));
    //                     onClose()
    //             })
    //             }
    //         })
    //     },
    // })

    // function handleDelete() {
    //     fetch(`/tasks/${task.id}`, {
    //         method: 'DELETE'
    //     })
    //     .then((r) => {
    //         if (r.ok) {
    //             setUserTasks(userTasks.filter(t => {
    //                 if (t.id !== task.id) return t
    //             }));
    //             onClose()
    //         } else {
    //             r.json().then(({error}) => console.log(error))
    //         }
    //     })
    // }
    /////////////////// END OF VARIABLES AND FUNCTIONS FOR MODAL ////////////////




    return (
        <>
        
    {/* ///////////////// START OF TABLE //////////////////////// */}
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
                        .rows
                        .map(row => {
                            return (
                                <Tr key={row.id} >
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
        </div>
    {/* ///////////////// END OF TABLE //////////////////////// */}

    {/* ///////////////// START OF MODAL //////////////////////// */}
        {/* <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>{task.project.name}</ModalHeader>
                <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />

                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Input
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />

                        <FormLabel htmlFor="comments">Comments</FormLabel>
                        <Textarea
                            id="comments"
                            name="comments"
                            value={formik.values.comments}
                            onChange={formik.handleChange}
                        />

                        <FormLabel htmlFor="start_date">Start Date</FormLabel>
                        <Input
                            id="start_date"
                            name="start_date"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                        />

                        <FormLabel htmlFor="end_date">Due Date</FormLabel>
                        <Input
                            id="end_date"
                            name="end_date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                        />

                        <FormLabel htmlFor="status">status</FormLabel>
                        <Select
                            id="status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            <option value='open'>Open</option>
                            <option value='complete'>Complete</option>
                            <option value='waiver_requested'>Waiver Requested</option>
                            <option value='not_applicable'>Not Applicable</option>
                            <option value='incomplete'>Incomplete</option>
                        </Select>

                        <Button colorScheme="blue" mr={3} type="submit" >
                            Save Changes
                        </Button>
                        <Button colorScheme='blue' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='yellow' mr={3} onClick={handleDelete}>
                            Delete Task
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal> */}
    {/* ///////////////// END OF MODAL //////////////////////// */}
        </>
    )
}

export default TaskTable