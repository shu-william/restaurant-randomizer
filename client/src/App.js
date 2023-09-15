import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Favorites from './views/Favorites';
import Navbar from "./components/Navbar";
import "./styles/styles.css"

function App() {
  
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

/*  useEffect(() => {
    axios.get("http://localhost:8000/api/users/currentuser", { withCredentials: true })
        .then(res => {
          console.log("Logged in")
          setLoggedIn(true);
        })
        .catch(err => {
          console.log("Not logged in")
          setLoggedIn(false);
        })
  })} */ // Current code checks for login state within each component upon mounting

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/home" element={<Home favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/favorites" element={<Favorites favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="*" element={<Navigate to="/home" replace favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
        {/* Add Footer here */}
      </div>
    </BrowserRouter>
  );
}

export default App;
