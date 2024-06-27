import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/img/logo-navbar.jpg";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {

    const { user, isLogged } = useAuth();

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
                        <Link className="navbar-brand" to={'/'}>
                            <figure>
                                <img src={logoImg} alt="Logo" className="img-fluid rounded-pill" />
                            </figure>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/'}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/photos'}>Foto</NavLink>
                                </li>
                                {user?.isAdmin && <li className="nav-item">
                                    <NavLink className="nav-link" to={'/categories'}>Categorie</NavLink>
                                </li>}
                                {user?.isSuperAdmin && <li className="nav-item">
                                    <a className="nav-link" href="#">Users</a>
                                </li>}
                                {!isLogged && <li className="nav-item">
                                    <a className="nav-link" href="#">Contattaci</a>
                                </li>}
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex">
                        <ul className="navbar-nav">
                            {!isLogged && <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/register'}>Register</NavLink>
                                </li>
                            </>}

                            {isLogged && <li className="nav-item">
                                <NavLink className="nav-link d-flex gap-2" to={'/dashboard'}>
                                    <span className={`${colorLogo()} logo`}>{logo()}</span>
                                    {user.name}
                                </NavLink>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;