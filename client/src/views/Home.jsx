import React, { useState } from 'react';
import LocationForm from '../components/LocationForm';
import RestaurantList from '../components/RestaurantList';

const Home = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants} = props;
    const [fetchedData, setFetchedData] = useState({});

    return (
        <div>
            <LocationForm fetchedData={fetchedData} setFetchedData={setFetchedData} />
            <RestaurantList 
                fetchedData={fetchedData} setFetchedData={setFetchedData} 
                favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} 
            />
        </div>
    )
}

export default Home;
