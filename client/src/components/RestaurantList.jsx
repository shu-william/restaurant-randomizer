import React from 'react';

const RestaurantList = (props) => {

    const {fetchedData, setFetchedData} = props;

    return (
        <div>
            <h1>Restaurants In Your Location:</h1>
            {
                fetchedData.length > 0 ?
                fetchedData.map((restaurant) => {
                    return (
                        <div key={restaurant.id}>
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.location.address1}, {restaurant.location.city} {restaurant.location.zip_code}</p>
                            <p>{restaurant.rating} Stars out of {restaurant.review_count} reviews</p>
                        </div>
                    )
                })
                : ""
            }
        </div>
    )
}

export default RestaurantList
