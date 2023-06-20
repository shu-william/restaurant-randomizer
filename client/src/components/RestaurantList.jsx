import axios from 'axios';
import React, { useEffect } from 'react';

const RestaurantList = (props) => {

    const {fetchedData, setFetchedData, favoriteRestaurants, setFavoriteRestaurants} = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/favorites", { withCredentials: true })
            .then(res => {
                console.log(res)
                setFavoriteRestaurants(res.data.favorites);
            })
            .catch(err => console.log(err))
    }, [])

    function addFavorite(restaurant) {
        axios.patch("http://localhost:8000/api/users/favorites", {
            "$push": 
                {"favorites": restaurant}
        }, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Restaurants In Your Location:</h1>
            {
                fetchedData.length > 0 ?
                fetchedData.map((restaurant) => {
                    return (
                        <div key={restaurant.id} className="my-3">
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.location.address1}, {restaurant.location.city} {restaurant.location.zip_code}</p>
                            <p>{restaurant.rating} Stars out of {restaurant.review_count} reviews</p>
                            {/* get button to show only when logged in */}
                            <button onClick={(e) => addFavorite(restaurant)} className="btn btn-info">Add to favorites</button> 
                        </div>
                    )
                })
                : ""
            }
        </div>
    )
}

export default RestaurantList;
