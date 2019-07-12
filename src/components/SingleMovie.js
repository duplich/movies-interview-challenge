import React, {Component} from 'react';
import axios from "axios";
import {Link, Redirect, Route} from "react-router-dom";
import CreateMovie from "./CreateMovie";
import StarRatingComponent from 'react-star-rating-component';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


export default class SingleMovie extends Component {
    constructor(props) {
        super(props);

        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.default_image = 'https://lorempixel.com/500/750';

        // initial state before getting the data
        this.state = {
            movie: {
                release_date: new Date(),
                img: this.default_image,
            },
            //setting the movie slug for query from the url params
            movie_slug: this.props.match.params.id,
            goHome: false
        };

        console.log('params: ', this.props.match.params.id)
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "Movie Deleted!",
            message: "Why did you do that you silly! How will people live witout that amazing movie, hah?",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {duration: 3000},
            dismissable: {click: true}
        });
    }

    getYear(_date) {
        const date = new Date(_date);
        return date.getFullYear();
    }

    componentDidMount() {
        this.setState({movie_id: this.props.match.params.id})

        axios.get('http://localhost:8000/movie/'+ this.state.movie_slug)
            .then((res) => {
                console.log('movie DATA:', res.data);
                const _movie = res.data;
                this.setState({
                    movie: {
                        title: _movie.title,
                        description: _movie.description,
                        director: _movie.director,
                        score: _movie.score,
                        release_date: _movie.release_date,
                        img: _movie.img ? _movie.img : this.default_image,
                        slug: _movie.slug,
                        _id: _movie._id
                    }
                });
                console.warn('new state data!', this.state.movie);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClickDeleteMovie(e) {
        e.preventDefault();
        const movie_id = e.target.id;
        console.log('clicked: ', movie_id);
        axios.get('http://localhost:8000/movies/delete/' + movie_id).then((res) => {
            console.log(res, ' Succesfully deleted');
            this.addNotification();
            setTimeout(() => {
                this.setState({goHome: 1})
            }, 3000)

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className='row'>
                <div className="col-sm-4">
                    <img style={{maxWidth: '100%'}} src={this.state.movie.img} alt={this.state.movie.title}/>
                </div>
                <div className="col-sm-8">
                    <h2>{this.state.movie.title} ({this.getYear(this.state.movie.release_date)})</h2>

                    <StarRatingComponent
                        name={this.state.movie.title + "-blah"}
                        value={this.state.movie.score}
                        starCount={5}
                        editing={false}
                    />
                    {/*<p>{this.state.movie.released}</p>*/}
                    <p className="movie-description">{this.state.movie.description}</p>

                    <button id={this.state.movie._id} className="btn-delete cta-btn" onClick={this.onClickDeleteMovie.bind(this)}>
                        <img src="https://img.icons8.com/flat_round/28/000000/delete-sign.png" alt={this.state.movie.title}/> delete
                    </button>
                    {this.state.goHome ? <Redirect to="/"/> : false}


                    <Route path="/edit/:id" component={CreateMovie}/>


                        <Link to={'/edit/'+this.state.movie._id} className=" btn-delete cta-btn">
                            <img src="https://img.icons8.com/cotton/26/000000/edit--v2.png" alt={''}/> Edit</Link>


                    <ReactNotification ref={this.notificationDOMRef}/>

                </div>
            </div>
        )
    }
}