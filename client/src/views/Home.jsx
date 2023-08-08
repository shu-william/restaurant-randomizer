import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import RestaurantList from '../components/RestaurantList';
import Navbar from '../components/Navbar';

const Home = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants} = props;
    const [fetchedData, setFetchedData] = useState({});

    return (
        <div className="col-md-10 mx-auto my-3 homeClass">
            <Navbar />
            <SearchForm fetchedData={fetchedData} setFetchedData={setFetchedData} />
            <RestaurantList
                fetchedData={fetchedData} setFetchedData={setFetchedData} 
                favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants} 
            />
        </div>
    )
}

export default Home;
