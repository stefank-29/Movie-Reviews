const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');
const commentController = require('../controllers/commentController');

router.post(
    '/register',
    userController.validateRegister,
    catchErrors(userController.register),
    authController.login,
    authController.sendUser
);

router.post('/login', authController.login, authController.sendUser);

router.get('/logout', authController.logout);

router.get('/user', authController.isUserLoggedIn);

router.get('/movies', movieController.getMovies);

router.get('/movies/:id', movieController.getMovie);

router.post('/account', catchErrors(userController.updateAccount));

router.put(
    '/movie/:id',
    movieController.upload,
    movieController.resize,
    movieController.updateMovie
);

router.delete('/movie/:id', movieController.deleteMovie);

router.get('/comment/:id', commentController.getComments);

router.post('/comment/:id', commentController.addComment);

router.post('/movies', movieController.upload, movieController.resize, movieController.addMovie);

module.exports = router;
