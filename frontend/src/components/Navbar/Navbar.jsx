import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/img/logo-navbar.jpg";

const Navbar = () => {
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
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Categorie</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contattaci</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;