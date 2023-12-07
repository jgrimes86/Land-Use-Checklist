
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
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/users/home/:id",
                element: <UserHome />
            },
            {
                path: "/users/account/:id",
                element: <EditUser />
            }
        ]
    }
]

export default routes