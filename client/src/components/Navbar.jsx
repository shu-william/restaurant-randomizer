import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/styles.css"

const Navbar = ({loggedIn, setLoggedIn}) => {

    const navigate = useNavigate();

    function logoutUser(e) {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res);
                setLoggedIn(false);
                navigate("/login");
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <nav className="navbar navbarStyle">
                <Link to={"/home"} className="nav-link mx-3 linkStyle">Home</Link>
                <Link to={"/favorites"} className="nav-link mx-3 linkStyle">Favorites</Link>
                {
                    loggedIn ?
                    <Link to={"/"} onClick={(e) => logoutUser(e)} className="nav-link mx-3 linkStyle">Logout</Link> :
                    <Link to={"/"} onClick={(e) => logoutUser(e)} className="nav-link mx-3 linkStyle">Login</Link>
                }
            </nav>
        </div>
    )
}

export default Navbar;
