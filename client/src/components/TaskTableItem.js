import { useFormik } from "formik";
import * as yup from "yup";
import { Tr, Td, } from '@chakra-ui/react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';


function TaskTableItem({task}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const formik = useFormik({
        initialValues: {
            
        }
    })





    return (
        <>
            <Tr onClick={onOpen} >
                <Td>{task.project.name}</Td>
                <Td>{task.start_date}</Td>
                <Td>{task.end_date}</Td>
                <Td>{task.status}</Td>
            </Tr>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        This is a modal
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Save Changes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default TaskTableItem
