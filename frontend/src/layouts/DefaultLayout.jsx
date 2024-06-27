import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const DefaultLayout = () => {
    return (<>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </>)
}

export default DefaultLayout;