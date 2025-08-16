import type { ISidebarItems } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
    return sidebarItems.flatMap((section) => section.items.map(route => ({        //puro array er upor map then item get kore proti item er upor abr map
        //flatmap - 2 leyer nested array k ak leyer a convert kore dey
        path: route.url,
        Component: route.component
    })));
}


// import type { ISidebarItems } from "@/types";

// export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
//     return sidebarItems.map((section) => section.items.map(route => ({        //puro array er upor map then item get kore proti item er upor abr map
//         path: route.url,
//         Component: route.component
//     })));
// }