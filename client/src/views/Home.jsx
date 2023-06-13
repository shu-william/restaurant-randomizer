import React, { useState } from 'react';
import LocationForm from '../components/LocationForm';

const Home = (props) => {

    const [fetchedData, setFetchedData] = useState({});

    return (
        <div>
            <LocationForm fetchedData={fetchedData} setFetchedData={setFetchedData} />
        </div>
    )
}

export default Home;
