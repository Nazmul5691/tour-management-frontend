import App from "@/App";
import about from "@/pages/about";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        // element: <App />
        children: [
            {
                path: "about",
                Component: about
            }
        ]
    }
])