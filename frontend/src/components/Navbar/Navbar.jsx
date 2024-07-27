import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/img/logo-navbar.jpg";
import logoMessages from "../../assets/img/speech-bubble.png";
import { useAuth } from "../../contexts/AuthContext";
import Toggle from "../Toggle/Toggle";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Navbar = () => {

    const { user, isLogged } = useAuth();

    const { isDark, setIsDark } = useDarkMode();

    const logo = () => {
        if (user.name) {
            const logo = user.name.split('').filter(l => l !== l.toLowerCase());
            return logo;
        }
    }

    const colorLogo = () => {
        let color = '';

        if (user?.isAdmin && user.isSuperAdmin) color = 'super-admin';

        if (user?.isAdmin && !user.isSuperAdmin) color = 'admin';

        return color;
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid px-5 nav">

                    <div className="d-flex">

                        <Link className="navbar-brand" to={`${user ? '/photos' : '/'}`}>
                            <figure>
                                <img src={logoImg} alt="Logo" className="img-fluid rounded-pill" />
                            </figure>
                        </Link>

                        <ul className="navbar-nav">

                            {!user && <li className="nav-item">
                                <NavLink className="nav-link" to={'/'}>Home</NavLink>
                            </li>}

                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/photos'}>Foto</NavLink>
                            </li>

                            {user?.isAdmin && <li className="nav-item">
                                <NavLink className="nav-link" to={'/categories'}>Categorie</NavLink>
                            </li>}

                            {user?.isSuperAdmin && <li className="nav-item">
                                <NavLink className="nav-link" to={'/users'}>Utenti</NavLink>
                            </li>}

                            {!isLogged && <li className="nav-item">
                                <NavLink to={'/contacts'} className="nav-link" href="#">Contattaci</NavLink>
                            </li>}

                        </ul>

                    </div>

                    <div>
                        <ul className="navbar-nav justify-content-end">

                            {!isLogged && <>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/register'}>Register</NavLink>
                                </li>

                            </>}

                            {isLogged && <>
                                <li className="nav-item">
                                    <NavLink className="nav-link d-flex gap-2" to={'/dashboard'}>
                                        <span className={`${colorLogo()} logo`}>{logo()}</span>
                                        {user.name}
                                    </NavLink>
                                </li>
                                {user && <li className="nav-item w-25">
                                    <NavLink className="nav-link" to={'/messages'}>
                                        <figure className="mb-0 w-75">
                                            <img src={logoMessages} alt="Messaggi" className="img-fluid" />
                                        </figure>
                                    </NavLink>
                                </li>}
                            </>}
                            <li className="ms-2">
                                <Toggle
                                    isChecked={isDark}
                                    handleChange={() => setIsDark(!isDark)}
                                />
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;