const User = require('../models/user.model');

module.exports.addToFavorites = (req, res) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.userId, req.body, { new: true })
        .then(updatedFavorites => res.json(updatedFavorites))
        .catch(err => res.status(400).send("Could not add to favorites."))
}