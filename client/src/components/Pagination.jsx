import React from 'react';
import axios from 'axios';

const Pagination = (props) => {

    const {fetchedData, setFetchedData, location, cost, cuisine, offset, setOffset} = props;

    // I think axios calls are still being made before offset updates correctly.
    // Check to see if the params are correct each time a button is pressed under different circumstances.

    function nextResults() {
        setOffset(offset + 20);
        axios.get('http://localhost:8000/yelp_api', {
            params: {
                location: location,
                cost: cost,
                cuisine: cuisine,
                offset: offset.toString(),
            }
        })
            .then(res => {
                let newData = res.data.businesses;
                setFetchedData(newData);
            })
    }

    function prevResults() {
        setOffset(offset - 20);
        axios.get('http://localhost:8000/yelp_api', {
            params: {
                location: location,
                cost: cost,
                cuisine: cuisine,
                offset: offset.toString(),
            }
        })
            .then(res => {
                let newData = res.data.businesses;
                setFetchedData(newData);
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
