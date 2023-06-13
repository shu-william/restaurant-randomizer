const axios = require('axios');
require('dotenv').config();

module.exports.getRestaurantsByLocation = (req, res) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer EQJgo6yP0c7cHmKQmLTTwSPwno7Ivii2vhhwCsDnTlsEalb9MgXoy96jwThYLRV8OupyrSrWDVgyBL6lX14YfMCrtRIyTF5Avd_dnpiicpB862VYMpWeNTTPU4WGZHYx'
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