
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


interface IProps {
    children: ReactNode
    // children: ReactElement
}

// export default function CommonLayout({ children } : {children: ReactNode}) {
export default function CommonLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="grow-1">
                {children}
            </div>
            <Footer />
        </div>
    );
}



// import { Outlet } from "react-router";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// export default function CommonLayout() {
//     return (
//         <div>
//             <Navbar />
//             <Outlet />
//             <Footer />
//         </div>
//     );
// }



// import type { ReactNode } from "react";

// export default function CommonLayout({ children } : {children: ReactNode}) {
//     return (
//         <div>
//             {children}
//         </div>
//     );
// }