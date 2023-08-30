import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import RestaurantList from '../components/RestaurantList';
import Navbar from '../components/Navbar';

const Home = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants, loggedIn, setLoggedIn} = props;
    const [fetchedData, setFetchedData] = useState({});
    const [location, setLocation] = useState("");
    const [cost, setCost] = useState("1");
    const [cuisine, setCuisine] = useState(["tradamerican"]);
    const [offset, setOffset] = useState(0);

    return (
        <div className="col-md-6 mx-auto my-3 homeClass">
            <Navbar 
                loggedIn={loggedIn} setLoggedIn={setLoggedIn}
            />
            <div className="d-flex justify-content-around">
            <SearchForm
                fetchedData={fetchedData} setFetchedData={setFetchedData}
                location={location} setLocation={setLocation}
                cost={cost} setCost={setCost}
                cuisine={cuisine} setCuisine={setCuisine}
                offset={offset} setOffset={setOffset}
            />
            <RestaurantList
                fetchedData={fetchedData} setFetchedData={setFetchedData}
                location={location} setLocation={setLocation}
                cost={cost} setCost={setCost}
                cuisine={cuisine} setCuisine={setCuisine}
                offset={offset} setOffset={setOffset}
                favoriteRestaurants={favoriteRestaurants} setFavoriteRestaurants={setFavoriteRestaurants}
                loggedIn={loggedIn} setLoggedIn={setLoggedIn}
            />
            </div>
        </div>
    )
}

export default Home;
