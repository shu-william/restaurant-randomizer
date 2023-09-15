const YelpController = require('../controllers/yelp_api.controller');

module.exports = app => {
    app.get('/yelp_api', YelpController.getRestaurantsByLocation);
    app.get('/yelp_api/review', YelpController.getReviewById);
}