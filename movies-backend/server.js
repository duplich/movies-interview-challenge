const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8000;

let Movie = require('./movies.model');
const routes = express.Router();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

// Adding the Movie Route to the Backend
app.use('/movies', routes);

routes.route('/').get(function (req, res) {
    Movie.find(function (err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.json(movies);
        }
    });
});

//Adding single Movie Route by ID
routes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.json(movie);
    });
});

//Adding single Movie Route SEO friendly
app.route('/movie/:slug').get( function (req, res) {
    let slug = req.params.slug;
    Movie.find({"slug": slug}, function (err, movie) {
        res.json(movie[0]);
    });
});

//Create a new Movie entry in the DB
routes.route('/add').post(function (req, res) {
    console.log('Route requested to add a movie');

    let movie = new Movie(req.body);

    movie.save()
        .then(movie => {
            console.log(movie);
            res.status(200).json({"title": movie._id + " movie added successfully"});
        })
        .catch(err => {
            res.status(400).send('adding new movie failed');
        });
});



//Edit and overwrite existing movie in the database
routes.route('/update/:id').post(function (req, res) {
    Movie.findById(req.params.id, function (err, movie) {

        if (!movie){
            res.status(404).send("data is not found");
        }
        else {
            _movie = req.body;
            movie.title = _movie.title;
            movie.img = _movie.img;
            movie.description = _movie.description;
            movie.director = _movie.director;
            movie.score = _movie.score;
            movie.release_date = _movie.release_date;

            movie.save()
                .then(movie => {

                res.json('Movie `${movie.title} ` updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

//Adding single Movie Route
routes.route('/delete/:id').get(function(req, res) {
    let id = req.params.id;
    Movie.deleteOne({"_id": id}, function (err, movie) {
        try{
            res.json(movie);
        }
        catch (err) {
            console.log(err);
        }

    });
});