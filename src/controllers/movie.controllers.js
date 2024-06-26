const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({ include: [Genre, Actor, Director] });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, { include: [Genre, Actor, Director] });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenresToMovies = catchError(async (req, res) => {
    // desestrutura el id de los parametros
    const { id } = req.params
    // busco la pelicula
    const movie = await Movie.findByPk(id)  
    // Si no se encontro (404)
    if(!movie) return res.status(404).json({ error: 'Movie not found'})
    // Caso que si se encontró se resetean los generos 
        await movie.setGenres(req.body)
    // Se leen los resultados y se lo almacenan en una const
        const genres = await movie.getGenres()
    // Se almacena con el objetivo de retornar un producto json de genres  
        return res.json(genres)
})

const setActorsToMovies = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if(!movie) return res.status(404).json({ error: 'Movie not found'})
    
    await movie.setActors(req.body)
    const actors = await movie.getActors()

    return res.json(actors)
})

const setDirectors = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if(!movie) return res.status(404).json({ error: 'Movie not found'})
    
    await movie.setDirectors(req.body)
    const directors = await movie.getDirectors()

    return res.json(directors)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenresToMovies,
    setActorsToMovies,
    setDirectors
}