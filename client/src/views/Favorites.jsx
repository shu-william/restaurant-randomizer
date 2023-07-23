import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Favorites = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants} = props;

    useEffect(() => {
        setFavoriteRestaurants([]);
        axios.get("http://localhost:8000/api/users/favorites", { withCredentials:true })
            .then(res => {
                console.log(res)
                setFavoriteRestaurants(res.data.user.favorites);
            })
            .catch(err => console.log(err))
    }, [])

    function removeFavorite(id) {
        axios.patch("http://localhost:8000/api/users/favorites", {
            "$pull":
                {"favorites": {"id": id}}
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                setFavoriteRestaurants(favoriteRestaurants.filter(restaurant => restaurant.id !== id));
            })
            .catch(err => console.log(err))
    }

    function pickRandom() {
        let randomRestaurant = favoriteRestaurants[Math.floor(Math.random() * favoriteRestaurants.length)];
        alert(randomRestaurant.name);
        // make this look nicer when you choose a random restaurant
    }

    return (
        <div className="col-md-10 mx-auto my-3">
            <Navbar />
            <h1 className="mb-3">Favorites</h1>
            {
                favoriteRestaurants.length > 0 ? 
                <button onClick={pickRandom}>Pick a random restaurant!</button>
                : ""
            }
            {
                favoriteRestaurants.map((restaurant) => {
                    return (
                        <div key={restaurant.id} className="my-3">
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.location.address1}, {restaurant.location.city} {restaurant.location.zip_code}</p>
                            <p>{restaurant.rating} Stars out of {restaurant.review_count} reviews</p>
                            <button onClick={(e) => removeFavorite(restaurant.id)} className="btn btn-info">Remove from favorites</button>
                        </div>                       
                    )
                })
            }
        </div>
    )
}

export default Favorites;
