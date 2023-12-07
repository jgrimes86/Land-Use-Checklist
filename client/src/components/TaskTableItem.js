import { Table, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react';


function TaskTableItem({task}) {
    

    return (
        <>
            <Tr>
                <Td>{task.project.name}</Td>
                <Td>{task.start_date}</Td>
                <Td>{task.end_date}</Td>
                <Td>{task.status}</Td>
            </Tr>
        </>

    )
}

export default TaskTableItem
