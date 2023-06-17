const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

module.exports.findOneUser = (req, res) => {
    User.findById(req.params.id)
        .then(oneUser => res.json(oneUser))
        .catch(err => res.json({ message: "Something went wrong retrieving user information.", error: err }));
}

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, JWT_KEY);
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ message: "Login success!", user: user });
        })
        .catch(err => res.json({ message: "Something went wrong creating a new user.", error: err }));
}

module.exports.loginUser = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.sendStatus({ status: 400, message: "The user could not be found." });
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        return res.sendStatus({ status: 400, message: "Password is incorrect." });
    }

    const userToken = jwt.sign({
        id: user._id
    }, JWT_KEY);

    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ message: "Login success!" });
}

module.exports.logout = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ message: "Something went wrong updating user information.", error: err }));
}

module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json({ message: "Something went wrong deleting the user.", error: err }));
}