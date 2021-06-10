const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const fs = require('fs');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'Error' }, false);
        }
    },
};

exports.upload = multer(multerOptions).single('file');

exports.resize = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`; // unique name
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./pictures/uploads/${req.body.photo}`);
    next();
};

exports.addMovie = async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        ageRestrict: req.body.ageRestrict,
        photo: req.body.photo,
    });

    await movie.save();
    res.status(200).send();
};

exports.getMovies = async (req, res) => {
    const movies = await Movie.find();

    res.send(movies);
};

exports.getMovie = async (req, res) => {
    const movie = await Movie.findOne({ _id: req.params.id });

    res.send(movie);
};

exports.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send();
};

exports.updateMovie = async (req, res) => {
    const updates = {
        name: req.body.name,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        ageRestrict: req.body.ageRestrict,
        photo: req.body.photo,
    };
    await Movie.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updates },
        {
            new: true,
            runValidators: true,
            context: 'query',
            useFindAndModify: false,
        }
    );
    res.status(200).send();
};
