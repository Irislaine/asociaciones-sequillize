const { getAll, create, getOne, remove, update, setGenresToMovies, setActorsToMovies, setDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id/genres') // se estabelece la ruta para el reseteo
    .post(setGenresToMovies)

routerMovie.route('/:id/actors')
    .post(setActorsToMovies)

routerMovie.route('/:id/directors')
    .post(setDirectors)    

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;