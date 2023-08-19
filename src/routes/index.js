import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
    {
        path: '',
        element: lazy(() => import('pages/HomeTemplate')),
        nested: [
            {
                path: '',
                element: lazy(() => import('./../pages/HomeTemplate/HomePage'))
            },
            {
                path: 'about',
                element: lazy(() => import('./../pages/HomeTemplate/AboutPage'))
            },
            {
                path: "detail/:id",
                element: lazy(() => import("./../pages/HomeTemplate/DetailMoviePage")),
            },
            {
                path: 'booking-ticket/:id',
                element: lazy(() => import("./../pages/HomeTemplate/BookingTicketPage")),
            }
        ]
    },
    {
        path: "admin",
        element: lazy(() => import("./../pages/AdminTemplate")),
        nested: [
            {
                path: "dashboard",
                element: lazy(() => import("./../pages/AdminTemplate/Dashboard")),
            },
            {
                path: "films",
                element: lazy(() => import("../pages/AdminTemplate/Films")),
            },
            {
                path: "add-user",
                element: lazy(() => import("../pages/AdminTemplate/Dashboard/AddUser")),
            },
        ],
    },
    {
        path: "auth",
        element: lazy(() => import("./../pages/AdminTemplate/LoginPage")),
    },
    {
        path: "register",
        element: lazy(() => import("../pages/AdminTemplate/RegisterPage")),
    }
]


const renderRoutes = () => {
    return routes.map((route) => {
        if (route.nested) {
            return (
                <Route key={route.path} path={route.path} element={<route.element />}>{
                    route.nested.map((item) =>
                        <Route key={item.path} path={item.path} element={<item.element />} />
                    )
                }</Route>

            )

        } else {
            return (
                <Route key={route.path} path={route.path} element={<route.element />}></Route>
            )
        }
    })
}


export default renderRoutes;