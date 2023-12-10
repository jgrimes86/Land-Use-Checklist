import { useFormik } from "formik";
import * as yup from "yup";


function TaskTableItem({task, userTasks, setUserTasks}) {
    // const { isOpen, onOpen, onClose } = useDisclosure()

    const formik = useFormik({
        initialValues: {
            name: task.name,
            description: task.description,
            start_date: task.start_date,
            end_date: task.end_date,
            status: task.status,
            comments: task.comments,
        },

        onSubmit: (values) => {
            fetch(`/tasks/${task.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json()
                    .then((updatedTask) => {
                        setUserTasks(userTasks.map(task => {
                            if (updatedTask.id === task.id) {
                                return updatedTask
                            } else return task
                        }));
                        // onClose()
                })
                }
            })
        },
    })

    function handleDelete() {
        fetch(`/tasks/${task.id}`, {
            method: 'DELETE'
        })
        .then((r) => {
            if (r.ok) {
                setUserTasks(userTasks.filter(t => {
                    if (t.id !== task.id) return t
                }));
                // onClose()
            } else {
                r.json().then(({error}) => console.log(error))
            }
        })
    }

    return (
        <>
            {/* <Tr onClick={onOpen} >
                <Td>{task.project.name}</Td>
                <Td>{task.start_date}</Td>
                <Td>{task.end_date}</Td>
                <Td>{task.status}</Td>
            </Tr> */}

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
        </>

    )
}

export default TaskTableItem
