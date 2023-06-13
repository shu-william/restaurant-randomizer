const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

module.exports.getRestaurantsByLocation = (req, res) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        },
        params: {
            location: req.params.location,
            sort_by: 'best_match',
            limit: 20
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
            console.error(err) 
        };    
    }

    fetchData();
}