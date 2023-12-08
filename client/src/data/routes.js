
import App from "../components/App";
import SignIn from "../components/SignIn";
import UserHome from "../components/UserHome";
import EditUser from "../components/EditUser";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <SignIn />
            },
            {
                path: "/users/:id",
                element: <UserHome />
            },
            {
                path: "/users/:id/accounts",
                element: <EditUser />
            }
        ]
    }
]

export default routes