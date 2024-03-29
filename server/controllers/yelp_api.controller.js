const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

// NOTE: The current version of this app does not filter by rating, since the Yelp API does not take that as a query in the initial search.
// If trying to sort by rating, you would need to run a loop to gather all data for one search query using offset, then filter out ratings manually.
// Since this requires a higher volume of searches, I have not implemented this feature at this time due to the current limit of 500 API calls per day.
module.exports.getRestaurantsByLocation = (req, res) => {
    var options;
    let price = req.query.cost.join();
    let categories = req.query.cuisine.join();
    if (req.query.latitude && req.query.longitude) {
        options = {
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            },
            params: {
                latitude: req.query.latitude,
                longitude: req.query.longitude,
                price: price,
                categories: categories,
                sort_by: 'best_match',
                limit: 20,
                offset: req.query.offset,
            }
        }
    } else {
        options = {
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            },
            params: {
                location: req.query.location,
                price: price,
                categories: categories,
                sort_by: 'best_match',
                limit: 20,
                offset: req.query.offset,
            }
        }        
    }

    async function fetchData() {
        try {
            const { data } = await axios.get(
                'https://api.yelp.com/v3/businesses/search',
                options
            )
            res.send(data);
        } catch (err) {
            // console.log(err.response.data);
            res.status(400).json({message: "The specified location did not retrieve any results, please try a different location."})
        };    
    }

    fetchData();
}

module.exports.getReviewById = (req, res) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        },
        params: {
            limit: '1',
            sort_by: 'yelp_sort'
        }
    }

    async function fetchReview(id) {
        try {
            const { data } = await axios.get(
                'https://api.yelp.com/v3/businesses/' + id + '/reviews',
                options
            )
            res.send(data);
        } catch (err) {
            res.status(400).json({message: "The specified restaurant did not return any reviews."});
        }
    }

    fetchReview(req.query.restaurantId);
}