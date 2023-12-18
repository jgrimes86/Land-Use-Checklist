
import App from "../components/App";
import SignIn from "../components/SignIn";
import UserHome from "../components/UserHome";
import EditUser from "../components/EditUser";
import Project from "../components/Project";
import EditProject from "../components/EditProject";
import ErrorPage from "../components/ErrorPage";
import NotFound from "../components/NotFound";
import TaskTemplates from "../components/TaskTemplates";

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
                path: "/home",
                element: <UserHome />,
            },
            {
                path: "/account",
                element: <EditUser />,
            },
            {
                path: "/projects/:id",
                element: <Project />,
            },
            {
                path: "/projects/:id/edit",
                element: <EditProject />,
            },
            {
                path: "/templates",
                element: <TaskTemplates />,
            },
            {
                path: "/404",
                element: <NotFound />,
            }
        ]
    }
]

export default routes