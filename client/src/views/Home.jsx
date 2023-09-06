import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import RestaurantList from '../components/RestaurantList';
// import Navbar from '../components/Navbar';
import "../styles/styles.css";

const Home = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants, loggedIn, setLoggedIn} = props;
    const [fetchedData, setFetchedData] = useState({});
    const [location, setLocation] = useState("");
    const [cost, setCost] = useState(["1"]);
    const [cuisine, setCuisine] = useState(["tradamerican"]);
    const [offset, setOffset] = useState(0);

    return (
      <div>
        <div className="col-md-6 mx-auto my-3">
          {/* <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
          <div className="d-flex homeClass">
            <div>
              <SearchForm
                fetchedData={fetchedData}
                setFetchedData={setFetchedData}
                location={location}
                setLocation={setLocation}
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
