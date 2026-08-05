import { Navigate, redirect } from "react-router";

type Props = {
    children: React.ReactNode;
}

export default function PrivateRoute({children}: Props)
{
    const user = localStorage.getItem("username");
    console.log(user)

    if(!user)
        return <Navigate to="/setup"></Navigate>;
    return children;
}