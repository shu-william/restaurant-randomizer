import React, { useState } from 'react';
import LocationForm from '../components/LocationForm';
import RestaurantList from '../components/RestaurantList';

const Home = (props) => {

    const [fetchedData, setFetchedData] = useState({});

    return (
        <div>
            <LocationForm fetchedData={fetchedData} setFetchedData={setFetchedData} />
            <RestaurantList fetchedData={fetchedData} setFetchedData={setFetchedData} />
        </div>
    )
}

export default Home;
