import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {     //withAuth function akta function/component return kore . je component ta amr j component ta withAuth er parameter er modde pathacci setai return kore dicce
    return function AuthWrapper() {
        const { isLoading, data } = useUserInfoQuery(undefined)

        // console.log('inside withAuth', data);

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" />
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
            return <Navigate to="/unauthorized" />;
        }

        return <Component />
    }


}