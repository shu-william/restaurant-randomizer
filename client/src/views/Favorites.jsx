import React, { useEffect } from 'react';
import axios from 'axios';
// import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import zerostar from '../images/regular/zerostar.png';
import onestar from '../images/regular/onestar.png';
import onehalfstar from '../images/regular/onehalfstar.png';
import twostar from '../images/regular/twostar.png';
import twohalfstar from '../images/regular/twohalfstar.png';
import threestar from '../images/regular/threestar.png';
import threehalfstar from '../images/regular/threehalfstar.png';
import fourstar from '../images/regular/fourstar.png';
import fourhalfstar from '../images/regular/fourhalfstar.png';
import fivestar from '../images/regular/fivestar.png';
import yelp_logo from '../images/Logo/Light bg/RGB/yelp_logo.png';

const MySwal = withReactContent(Swal);

const Favorites = (props) => {

    const {favoriteRestaurants, setFavoriteRestaurants, loggedIn, setLoggedIn} = props;

    const ratingImages = {
        0: {
            src: zerostar,
            alt: '0 stars'
        },
        1: {
            src: onestar,
            alt: '1 star'
        },
        1.5: {
            src: onehalfstar,
            alt: '1.5 stars'
        },
        2: {
            src: twostar,
            alt: '2 stars'
        },
        2.5: {
            src: twohalfstar,
            alt: '2.5 stars'
        },
        3: {
            src: threestar,
            alt: '3 stars'
        },
        3.5: {
            src: threehalfstar,
            alt: '3.5 stars'
        },
        4: {
            src: fourstar,
            alt: '4 stars'
        },
        4.5: {
            src: fourhalfstar,
            alt: '4.5 stars'
        },
        5: {
            src: fivestar,
            alt: '5 stars'
        }
    }

    useEffect(() => {
        setFavoriteRestaurants([]);
        axios.get("http://localhost:8000/api/users/currentuser", { withCredentials:true })
            .then(res => {
                // console.log(res);
                setLoggedIn(true);
                setFavoriteRestaurants(res.data.user.favorites);
            })
            .catch(err => {
                // console.log(err);
                setLoggedIn(false);
            })
    }, [])

    function removeFavorite(id) {
        axios.patch("http://localhost:8000/api/users/favorites", {
            "$pull":
                {"favorites": {"id": id}}
        }, { withCredentials: true })
            .then(res => {
                // console.log(res);
                setFavoriteRestaurants(favoriteRestaurants.filter(restaurant => restaurant.id !== id));
            })
            .catch(err => console.log(err))
    }

    async function pickRandom() {
        let randomRestaurant =
            favoriteRestaurants[Math.floor(Math.random() * favoriteRestaurants.length)];
        let reviewExcerpts = await axios.get('http://localhost:8000/yelp_api/review', {
            params: {
                restaurantId: randomRestaurant.id
            }
        })
        reviewExcerpts = reviewExcerpts.data.reviews.slice(0,2);
        MySwal.fire({
            title: 
                randomRestaurant.name
            ,
            html: (
                <div>
                <img src={ratingImages[randomRestaurant.rating].src} alt={ratingImages[randomRestaurant.rating].alt} className="ratingStyle mb-4" />
                <p>"{reviewExcerpts[0].text}" <br/> - {reviewExcerpts[0].user.name}</p>
                </div>
            ),
            imageUrl: randomRestaurant.image_url,
            imageWidth: 300,
            color: "black",
            background: "white",
            confirmButtonText: (
                <img src={yelp_logo} alt="yelp logo" className="logoStyle" />
            ),
            confirmButtonColor: 'rgb(255, 228, 179)',
            showCancelButton: true,
            cancelButtonText: 'OK',
            cancelButtonColor: 'blue',
        }).then((result) => {
            if (result.value) {
                window.open(randomRestaurant.url, "_blank", "noreferrer");
            }
        });
    }

    return (
        <div className="favText">
            {/* <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
            <h1 className="favHeader">Favorites</h1>
            {
                loggedIn 
                ?   favoriteRestaurants.length > 0 
                    ? <button className="randomButton" onClick={pickRandom}>Pick a random restaurant!</button>
                    : <p className="favText">Please add restaurants to your favorites.</p>
                : <p className="favText">Please log in to view favorites.</p>
            }
            {
                favoriteRestaurants.map((restaurant) => {
                    return (
                        <div key={restaurant.id} className="my-3">
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.location.address1}, {restaurant.location.city} {restaurant.location.zip_code} <a href={restaurant.url} target="_blank" rel="noreferrer noopener"><img src={yelp_logo} alt="yelp_logo" className="logoStyle"/></a></p>
                            <p><img src={ratingImages[restaurant.rating].src} alt={ratingImages[restaurant.rating].alt} className="ratingStyle"/> out of {restaurant.review_count} reviews</p>
                            <button onClick={(e) => removeFavorite(restaurant.id)} className="btn btn-info">Remove from favorites</button>
                        </div>                       
                    )
                })
            }
        </div>
    )
}

export default Favorites;
