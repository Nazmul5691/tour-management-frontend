import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


export default function Verify() {

    const location = useLocation()
    // console.log(location.state);
    const [email] = useState(location.state);
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            navigate("/")
        }
    }, [email])


    return (
        <div>
            <h1>This is Verify component</h1>
        </div>
    );
}