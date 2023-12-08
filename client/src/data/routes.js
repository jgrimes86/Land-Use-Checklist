
import App from "../components/App";
import SignIn from "../components/SignIn";
import UserHome from "../components/UserHome";
import EditUser from "../components/EditUser";
import Project from "../components/Project";

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
            },
            {
                path: "/projects/:id",
                element: <Project />
            }
        ]
    }
]

export default routes