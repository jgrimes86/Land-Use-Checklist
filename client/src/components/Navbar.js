
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

function NavBar({userId, handleLogout}) {

    return (
        <nav>
            <ChakraLink as={ReactRouterLink} to={`/users/${userId}/accounts`}>
                Edit Account
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to={`/users/${userId}`}>
                Home
            </ChakraLink>
            <ChakraLink onClick={handleLogout} as={ReactRouterLink} to="/login" >
                Log Out
            </ChakraLink>
        </nav>
    )
}

export default NavBar

