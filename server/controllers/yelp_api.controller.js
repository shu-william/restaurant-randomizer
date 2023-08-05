const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

module.exports.getRestaurantsByLocation = (req, res) => {
    let categories = new URLSearchParams(req.query.cuisine.map(s => ['categories', s]))
    categories = categories.toString().slice(11);
    console.log(categories)
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        },
        params: {
            location: req.query.location,
            price: req.query.cost,
            categories: categories,
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