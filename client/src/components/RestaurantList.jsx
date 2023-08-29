import axios from "axios";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Pagination from "./Pagination";
import zerostar from "../images/regular/zerostar.png";
import onestar from "../images/regular/onestar.png";
import onehalfstar from "../images/regular/onehalfstar.png";
import twostar from "../images/regular/twostar.png";
import twohalfstar from "../images/regular/twohalfstar.png";
import threestar from "../images/regular/threestar.png";
import threehalfstar from "../images/regular/threehalfstar.png";
import fourstar from "../images/regular/fourstar.png";
import fourhalfstar from "../images/regular/fourhalfstar.png";
import fivestar from "../images/regular/fivestar.png";
import yelp_logo from "../images/Logo/Light bg/RGB/yelp_logo.png";

const MySwal = withReactContent(Swal);

const RestaurantList = (props) => {
  const {
    fetchedData,
    setFetchedData,
    location,
    setLocation,
    cost,
    setCost,
    cuisine,
    setCuisine,
    offset,
    setOffset,
    favoriteRestaurants,
    setFavoriteRestaurants,
    loggedIn,
    setLoggedIn,
  } = props;

  const ratingImages = {
    0: {
      src: zerostar,
      alt: "0 stars",
    },
    1: {
      src: onestar,
      alt: "1 star",
    },
    1.5: {
      src: onehalfstar,
      alt: "1.5 stars",
    },
    2: {
      src: twostar,
      alt: "2 stars",
    },
    2.5: {
      src: twohalfstar,
      alt: "2.5 stars",
    },
    3: {
      src: threestar,
      alt: "3 stars",
    },
    3.5: {
      src: threehalfstar,
      alt: "3.5 stars",
    },
    4: {
      src: fourstar,
      alt: "4 stars",
    },
    4.5: {
      src: fourhalfstar,
      alt: "4.5 stars",
    },
    5: {
      src: fivestar,
      alt: "5 stars",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/currentuser", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setLoggedIn(true);
        setFavoriteRestaurants(res.data.user.favorites);
      })
      .catch((err) => {
        // console.log(err);
        setLoggedIn(false);
      });
  }, []);

  // useEffect(() => {
  //     console.log(fetchedData);
  // }, [fetchedData])

  // useEffect(() => {
  //     console.log(offset);
  // }, [offset])

  function addFavorite(restaurant) {
    axios
      .patch(
        "http://localhost:8000/api/users/favorites",
        {
          $push: { favorites: restaurant },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        })
      .catch((err) => console.log(err));
  }

  function pickRandom() {
    let randomRestaurant =
      fetchedData[Math.floor(Math.random() * fetchedData.length)];
    MySwal.fire({
      title: (
        <div>
          <p>{randomRestaurant.name}</p>
          <p>
            <a
              href={randomRestaurant.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={yelp_logo} alt="yelp_logo" className="logoStyle" />
            </a>
          </p>
        </div>
      ),
      color: "orange",
      background: "white",
    });
  }

  return (
    <div>
      <h1 className="mb-3 titleFont">Restaurants In Your Location:</h1>
      {fetchedData.length > 0 ? (
        <button className="randomButton" onClick={pickRandom}>
          Pick a random restaurant!
        </button>
      ) : (
        ""
      )}
      {
        fetchedData.length > 0
          ? fetchedData.map((restaurant) => {
              return (
                <div key={restaurant.id} className="my-3">
                  <h3>{restaurant.name}</h3>
                  <p>
                    {restaurant.location.address1}, {restaurant.location.city}{" "}
                    {restaurant.location.zip_code}{" "}
                    <a
                      href={restaurant.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <img
                        src={yelp_logo}
                        alt="yelp_logo"
                        className="logoStyle"
                      />
                    </a>
                  </p>
                  <p>
                    <img
                      src={ratingImages[restaurant.rating].src}
                      alt={ratingImages[restaurant.rating].alt}
                      className="ratingStyle"
                    />{" "}
                    out of {restaurant.review_count} reviews
                  </p>
                  {
                  loggedIn ? (
                    <button
                      onClick={(e) => addFavorite(restaurant)}
                      className="btn btn-info"
                    >
                      Add to favorites
                    </button>
                  ) : (
                    ""
                  )
                  }
                </div>
              );
            })
          : "There are no restaurants that match the given criteria." // Consider getting this to show only after searching, as opposed to on page load.
      }
      <Pagination
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
  );
};

export default RestaurantList;
