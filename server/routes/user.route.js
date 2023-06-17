const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/users/register', UserController.createUser);
    app.post('/api/users/login', UserController.loginUser);
    app.post('/api/users/logout', UserController.logout);
    app.get('/api/users/:id', UserController.findOneUser);

}