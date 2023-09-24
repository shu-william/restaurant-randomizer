import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

    function orangix() {
      MySwal.fire({
        title: 'orangix',
        html: 
          (
            <div>
              <p>pizza is a flour</p>
              <p>carbatuib is a blower</p>
              <p>the end</p>
            </div>
          )
        ,
        color: "orange",
        background: "white",
        focusConfirm: false,
        confirmButtonText: 
          '🍊',
        confirmButtonColor: 'rgb(255, 228, 179)'
      })
    }

    return (
        
      <header className="navFilterStyle">
          <div>
            <button type="button" onClick={orangix} className="orangeLogo"></button>
          </div>
          <nav className="navbar navbarStyle">
            <Link to={"/home"} className="nav-link linkStyle">
              Home
            </Link>
            <Link to={"/favorites"} className="nav-link linkStyle">
              Favorites
            </Link>
            {loggedIn ? (
              <Link
                to={"/"}
                onClick={(e) => logoutUser(e)}
                className="nav-link linkStyle"
              >
                Logout
              </Link>
            ) : (
              <Link
                to={"/"}
                onClick={(e) => logoutUser(e)}
                className="nav-link linkStyle"
              >
                Login
              </Link>
            )}
          </nav>
          <div>
            {/* For positioning */}
          </div>
      </header>
    );
}

export default Navbar;
