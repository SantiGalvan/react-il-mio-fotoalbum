import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useDarkMode } from "../contexts/DarkModeContext";

const DefaultLayout = () => {

    const { isDark } = useDarkMode();

    return (
        <div className="App" data-theme={isDark ? 'dark' : 'light'}>

            <Navbar />

            <main>
                <Outlet />
            </main>

        </div>
    )
}

export default DefaultLayout;