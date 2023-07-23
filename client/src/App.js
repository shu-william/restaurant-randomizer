import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Favorites from './views/Favorites';

function App() {
  
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} />} />
          <Route path="*" element={<Navigate to="/home" replace favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
