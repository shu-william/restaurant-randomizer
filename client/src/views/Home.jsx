import React, { useState } from 'react';
import LocationForm from '../components/LocationForm';
import RestaurantList from '../components/RestaurantList';
import Navbar from '../components/Navbar';

const Home = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants} = props;
    const [fetchedData, setFetchedData] = useState({});

    return (
        <div className="col-md-10 mx-auto my-3">
            <Navbar />
            <LocationForm fetchedData={fetchedData} setFetchedData={setFetchedData} />
            <RestaurantList
                fetchedData={fetchedData} setFetchedData={setFetchedData} 
                favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} 
            />
        </div>
    )
}

export default Home;
