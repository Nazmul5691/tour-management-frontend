
import Bookings from "@/pages/User/Bookings";
import type {  ISidebarItems } from "@/types";

export const userSidebarItems: ISidebarItems[] = [
    {
        title: "Booking History",
        items: [
            {
                title: "History",
                url: "/user/bookings",
                component: Bookings
            },
        ],
    }
]