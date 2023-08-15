import React from 'react';
import axios from 'axios';

const Pagination = (props) => {

    const {fetchedData, setFetchedData, location, cost, cuisine, offset, setOffset} = props;

    // Could be a temporary workaround, but right now I am updating offset in the
    // params as well as in state because setState is asynchronous and lags behind the API call.
    // Could look for a better fix if bugs arise.

    function nextResults() {
        axios.get('http://localhost:8000/yelp_api', {
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

    function prevResults() {
        axios.get('http://localhost:8000/yelp_api', {
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

    return (
        <div>
            {
                offset >= 20 ?
                <button onClick={prevResults}>Previous</button>
                : ""
            }
            {
                fetchedData.length === 20 ?
                <button onClick={nextResults}>Next</button>
                : ""
            }
        </div>
    )
}

export default Pagination;
