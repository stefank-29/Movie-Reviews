const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const movieSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    genre: {
        type: String,
    },
    releaseDate: {
        type: Date,
    },
    ageRestrict: {
        type: Number,
    },
    photo: {
        type: String,
    },
});

module.exports = mongoose.model('Movie', movieSchema);
