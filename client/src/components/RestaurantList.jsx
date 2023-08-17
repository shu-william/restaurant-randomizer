import axios from 'axios';
import React, { useEffect } from 'react';
import swal from 'sweetalert';
import Pagination from './Pagination';
import zerostar from '../images/regular/zerostar.png';
import onestar from '../images/regular/onestar.png';
import onehalfstar from '../images/regular/onehalfstar.png';

const RestaurantList = (props) => {

    const {fetchedData, setFetchedData, location, setLocation, cost, setCost, cuisine, setCuisine, offset, setOffset, setFavoriteRestaurants} = props;

    const ratingImages = {
        0: {
            src: zerostar,
            alt: 'zerostar'
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/favorites", { withCredentials: true })
            .then(res => {
                console.log(res);
                setFavoriteRestaurants(res.data.user.favorites);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(fetchedData);
    }, [fetchedData])

    // useEffect(() => {
    //     console.log(offset);
    // }, [offset])

    function addFavorite(restaurant) {
        axios.patch("http://localhost:8000/api/users/favorites", {
            "$push": 
                {"favorites": restaurant}
        }, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function pickRandom() {
        let randomRestaurant = fetchedData[Math.floor(Math.random() * fetchedData.length)];
        swal(randomRestaurant.name);
        // make this look nicer when you choose a random restaurant
    }

    return (
        <div>
            <h1 className="mb-3 titleFont">Restaurants In Your Location:</h1>
            {
                fetchedData.length > 0 ?
                <button onClick={pickRandom}>Pick a random restaurant!</button>
                : ""
            }
            {
                fetchedData.length > 0 ?
                fetchedData.map((restaurant) => {
                    return (
                        <div key={restaurant.id} className="my-3">
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.location.address1}, {restaurant.location.city} {restaurant.location.zip_code}</p>
                            <p>{restaurant.rating} Stars out of {restaurant.review_count} reviews</p>
                            <img src={ratingImages[0].src} alt={ratingImages[0].alt} />
                            {/* get button to show only when logged in */}
                            <button onClick={(e) => addFavorite(restaurant)} className="btn btn-info">Add to favorites</button> 
                        </div>
                    )
                })
                : "There are no restaurants that match the given criteria." // Consider getting this to show only after searching, as opposed to on page load.
            }
            <Pagination 
                fetchedData={fetchedData} setFetchedData={setFetchedData}
                location={location} setLocation={setLocation}
                cost={cost} setCost={setCost}
                cuisine={cuisine} setCuisine={setCuisine}
                offset={offset} setOffset={setOffset}
            />
        </div>
    )
}

export default RestaurantList;
