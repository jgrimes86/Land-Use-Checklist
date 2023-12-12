
import App from "../components/App";
import SignIn from "../components/SignIn";
import UserHome from "../components/UserHome";
import EditUser from "../components/EditUser";
import Project from "../components/Project";
import EditProject from "../components/EditProject";

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
                path: "/users/:id/account",
                element: <EditUser />
            },
            {
                path: "/projects/:id",
                element: <Project />
            },
            {
                path: "/projects/:id/edit",
                element: <EditProject />
            }
        ]
    }
]

export default routes