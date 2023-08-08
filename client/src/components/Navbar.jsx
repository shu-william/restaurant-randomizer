import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/styles.css"

const Navbar = () => {

    const navigate = useNavigate();

    function logoutUser(e) {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/login");
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <nav className="navbar navbar-light justify-content-end navbarStyle">
                <Link to={"/home"} className="nav-link mx-3">Home</Link>
                <Link to={"/favorites"} className="nav-link mx-3">Favorites</Link>
                <Link to={"/"} onClick={(e) => logoutUser(e)} className="nav-link mx-3">Logout</Link>
            </nav>
        </div>
    )
}

export default Navbar;
