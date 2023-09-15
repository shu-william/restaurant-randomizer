import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import RestaurantList from '../components/RestaurantList';
// import Navbar from '../components/Navbar';
import "../styles/styles.css";

const Home = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants, loggedIn, setLoggedIn} = props;
    const [fetchedData, setFetchedData] = useState({});
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [cost, setCost] = useState([]);
    const [cuisine, setCuisine] = useState(["tradamerican"]);
    const [offset, setOffset] = useState(0);

    return (
      <div>
        <div className="col-md-6 mx-auto">
          {/* <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
          <div className="d-flex homeClass">
            <div>
              <SearchForm
                fetchedData={fetchedData}
                setFetchedData={setFetchedData}
                location={location}
                setLocation={setLocation}
                latitude={latitude}
                setLatitude={setLatitude}
                longitude={longitude}
                setLongitude={setLongitude}
                cost={cost}
                setCost={setCost}
                cuisine={cuisine}
                setCuisine={setCuisine}
                offset={offset}
                setOffset={setOffset}
              />
            </div>

            <div className="marginL">
              <RestaurantList
                fetchedData={fetchedData}
                setFetchedData={setFetchedData}
                location={location}
                setLocation={setLocation}
                latitude={latitude}
                setLatitude={setLatitude}
                longitude={longitude}
                setLongitude={setLongitude}
                cost={cost}
                setCost={setCost}
                cuisine={cuisine}
                setCuisine={setCuisine}
                offset={offset}
                setOffset={setOffset}
                favoriteRestaurants={favoriteRestaurants}
                setFavoriteRestaurants={setFavoriteRestaurants}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;
