import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Verify from "@/pages/Auth/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Auth/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Tours from "@/pages/Tours/Tours";
import TourDetails from "@/pages/Tours/TourDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import Cancel from "@/pages/Payment/Cancel";
import Homepage from "@/pages/Home/Homepage";
import AboutUs from "@/pages/AboutUs/AboutUs";
import Destination from "@/components/modules/destination/Destination";
import Blog from "@/components/modules/blog/Blog";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        // Component: CommonLayout,
        // element: <App />
        children: [
            {
                index: true,
                Component: Homepage
            },
            {
                path: "tours",
                Component: Tours
            },
            {
                path: "tours/:id",
                Component: TourDetails
            },
            {
                path: "destination",
                Component: Destination
            },
            {
                path: "about",
                Component: AboutUs
            },
            {
                path: "blog",
                Component: Blog
            },
            {
                path: "booking/:id",
                Component: withAuth(Booking)
            },

        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        // Component: DashboardLayout,
        children: [{ index: true, element: <Navigate to="/admin/analytics" /> }, ...generateRoutes(adminSidebarItems)]
        // children: [...generateRoutes(adminSidebarItems)]      //array return kortece and amader children er vitor indivisual ak akta object lagbe tai spreed kore dilam 
    },
    {
        path: "/user",
        Component: withAuth(DashboardLayout, role.user as TRole),
        children: [{ index: true, element: <Navigate to="/user/bookings" /> }, ...generateRoutes(userSidebarItems)]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "/verify",
        Component: Verify
    },
    {
        path: "/unauthorized",
        Component: Unauthorized
    },
    {
        Component: Success,
        path: "/payment/success",
    },
    {
        Component: Fail,
        path: "/payment/fail",
    },
    {
        Component: Cancel,
        path: "/payment/cancel",
    },
])




// import App from "@/App";
// import DashboardLayout from "@/components/layout/DashboardLayout";
// import About from "@/pages/About";
// import AddTour from "@/pages/Admin/AddTour";
// import AddTourType from "@/pages/Admin/AddTourType";
// import Analytics from "@/pages/Admin/Analytics";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Bookings from "@/pages/User/Bookings";
// import Verify from "@/pages/Verify";
// import { createBrowserRouter } from "react-router";

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         Component: App,
//         // Component: CommonLayout,
//         // element: <App />
//         children: [
//             {
//                 path: "about",
//                 Component: About
//             }
//         ]
//     },
//     {
//         path: "/admin",
//         Component: DashboardLayout,
//         children: [
//             {
//                 // path: "/admin/analytics",
//                 path: "analytics",
//                 Component: Analytics
//             },
//             {
//                 path: "add-tour",
//                 Component: AddTour
//             },
//             {
//                 path: "add-tour-type",
//                 Component: AddTourType
//             }
//         ]
//     },
//     {
//         path: "/user",
//         Component: DashboardLayout,
//         children: [
//             {
//                 path: "bookings",
//                 Component: Bookings
//             }
//         ]
//     },
//     {
//         path: "/login",
//         Component: Login
//     },
//     {
//         path: "/register",
//         Component: Register
//     },
//     {
//         path: "/verify",
//         Component: Verify
//     }
// ])