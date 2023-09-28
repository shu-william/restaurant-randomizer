import React from 'react';
import axios from 'axios';

const Pagination = (props) => {

    const {fetchedData, setFetchedData, location, latitude, longitude, cost, cuisine, offset, setOffset} = props;

    // Could be a temporary workaround, but right now I am updating offset in the
    // params as well as in state because setState is asynchronous and lags behind the API call.
    // Could look for a better fix if bugs arise.

    function nextResults() {
        if (latitude && longitude) {
            axios.get(`${process.env.REACT_APP_API_URI}/yelp_api`, {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    cost: cost,
                    cuisine: cuisine,
                    offset: offset + 20,
                }
            })
            .then(res => {
                setOffset(offset + 20);
                setFetchedData(res.data.businesses);
            })
        } else {
            axios.get(`${process.env.REACT_APP_API_URI}/yelp_api`, {
                params: {
                    location: location,
                    cost: cost,
                    cuisine: cuisine,
                    offset: offset + 20,
                }
            })
            .then(res => {
                setOffset(offset + 20);
                setFetchedData(res.data.businesses);
            })
        }
    }

    function prevResults() {
        if (latitude && longitude) {
            axios.get(`${process.env.REACT_APP_API_URI}/yelp_api`, {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    cost: cost,
                    cuisine: cuisine,
                    offset: offset - 20,
                }
            })
            .then(res => {
                setOffset(offset - 20);
                setFetchedData(res.data.businesses);
            })
        } else {
            axios.get(`${process.env.REACT_APP_API_URI}/yelp_api`, {
                params: {
                    location: location,
                    cost: cost,
                    cuisine: cuisine,
                    offset: offset - 20,
                }
            })
            .then(res => {
                setOffset(offset - 20);
                setFetchedData(res.data.businesses);
            })
        }
    }

    return (
        <div className="pagination">
            {
                offset >= 20 ?
                <button
                    onClick={prevResults}
                    className="btn-prev-next">Previous</button>
                : ""
            }
            {
                fetchedData.length === 20 ?
                <button
                    onClick={nextResults}
                    className="btn-prev-next">Next</button>
                : ""
            }
        </div>
    )
}

export default Pagination;
