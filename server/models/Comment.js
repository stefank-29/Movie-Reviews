const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const movieSchema = new Schema({ 
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie',
    },
    title: {
        type: String,
    },
    comment: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now,
    } 

});


module.exports = mongoose.model('Comment', movieSchema);