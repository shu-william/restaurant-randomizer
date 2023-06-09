import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './views/Home';
import Login from './views/Login';
import Favorites from './views/Favorites';

function App() {
  
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path="/"><Redirect to="/home" /></Route> */}
          <Route path="/home" element={<Home favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
