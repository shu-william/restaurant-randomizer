const YelpController = require('../controllers/yelp_api.controller');

module.exports = app => {
    app.get('/yelp_api/:location', YelpController.getRestaurantsByLocation);
}