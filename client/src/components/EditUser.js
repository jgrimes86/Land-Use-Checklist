import { useNavigate, useOutletContext } from "react-router-dom"
import { Button } from "@chakra-ui/react"

function EditUser() {
    const {user} = useOutletContext();
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/users/home/${user.id}`)
    }

    return (
        <div>
            <h1>This is for editing the user info</h1>
            <Button colorScheme="blue" onClick={handleClick} >Home</Button>
        </div>
    )
}

export default EditUser