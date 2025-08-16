import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/User/Bookings";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        // Component: CommonLayout,
        // element: <App />
        children: [
            {
                path: "about",
                Component: About
            }
        ]
    },
    {
        path: "/admin",
        Component: DashboardLayout,
        children: [
            ...generateRoutes(adminSidebarItems)        //array return kortece and amader children er vitor indivisual ak akta object lagbe tai spreed kore dilam 
        ]
    },
    {
        path: "/user",
        Component: DashboardLayout,
        children: [
            {
                path: "bookings",
                Component: Bookings
            }
        ]
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
    }
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