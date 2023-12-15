
import App from "../components/App";
import SignIn from "../components/SignIn";
import UserHome from "../components/UserHome";
import EditUser from "../components/EditUser";
import Project from "../components/Project";
import EditProject from "../components/EditProject";
import ErrorPage from "../components/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <SignIn />,
            },
            {
                path: "/user/home",
                element: <UserHome />,
            },
            {
                path: "/user/account",
                element: <EditUser />,
            },
            {
                path: "/projects/:id",
                element: <Project />,
            },
            {
                path: "/projects/:id/edit",
                element: <EditProject />,
            }
        ]
    }
]

export default routes