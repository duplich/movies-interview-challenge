const mongoose = require('mongoose');
const monguurl = require('monguurl');
const Schema = mongoose.Schema;

let Movie = new Schema({

    title: {
        type: String
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    director: {
        type: String
    },
    score: {
        type: Number
    },
    release_date: {
        type: Date
    },
    slug: { type: String, index: { unique: true } }

});
Movie.plugin(monguurl({
    source: 'title',
    target: 'slug'
}));

module.exports = mongoose.model('Movie', Movie);