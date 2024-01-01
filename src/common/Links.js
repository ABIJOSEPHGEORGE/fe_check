// import React from "react";
// import Error404 from "../pages/404";
import Login from "../pages/V3/Auth/Login";
import Signup from "../pages/V3/Auth/Signup";
import EditUserDetails from "../pages/V3/EditUserDetails";
import Home from "../pages/V3/Home";
// import Matches from '../pages/V3/Matches';
import Connections from "../pages/V3/Connections";
// import Shortlisted from '../pages/V3/Shortlisted';
// import Messages from "../pages/V3/Messages";
// import WalletPage from "../pages/V3/Wallet";

export const Links = [
    {
        name: "Home",
        path: "/",
        element: <Home />,
        showInNavigation: true,
    },
    {
        name: "Signup",
        path: "/signup",
        element: <Signup />,
        showInNavigation: true,
    },
    {
        name: "Login",
        path: "/login",
        element: <Login />,
        showInNavigation: true,
    },
    {
        name: "Dashboard",
        path: "/dashboard/",
        element: <EditUserDetails />,
        showInNavigation: true,
    },
    // {
    //     name: "Wallet",
    //     path: "/dashboard/wallet",
    //     element: <WalletPage/>,
    //     showInNavigation: true,
    // },
    // {
    //     name: "Matches",
    //     path: "/dashboard/matches",
    //     element: <Matches/>,
    //     showInNavigation: true,
    // },
    {
        name: "Connections",
        path: "/dashboard/connections",
        element: <Connections/>,
        showInNavigation: true,
    },
    // {
    //     name: "Shortlisted",
    //     path: "/dashboard/shortlisted",
    //     element: <Shortlisted/>,
    //     showInNavigation: true,
    // },
    // {
    //     name: "Messages",
    //     path: "/dashboard/messages",
    //     element: <Messages/>,
    //     showInNavigation: true,
    // },
    // {
    //     name: "Error404",
    //     path: "*",
    //     element: <Error404 />,
    //     showInNavigation: false,
    // },
];
