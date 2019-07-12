import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";
import ReactNotification from "react-notifications-component";


export default class CreateMovie extends Component {

    constructor(props) {
        super(props);

        const movie_id = undefined;



        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.movie_id = this.props.match.params.id;
        console.warn('movie ID:', this.movie_id);
        this.state = {
            title: '',
            slug: undefined,
            description: '',
            img: '',
            director: '',
            release_date: new Date(),
            score: 3,
            _id: movie_id ? movie_id : null,
            button_label: this.movie_id ? "Update movie" : "Create movie"
        };

        if(this.movie_id) {this.getMovieData()};
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "New movie yay!",
            message: "You just published the new movie. Do you know how awesome you are? Publish another one and get even awesomeeer :)",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {duration: 3000},
            dismissable: {click: true}
        });
    }


    addUpdatedNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "This is awesome!",
            message: "You just updated the movie and made it even nicer. Stop doing this, since other movie websites will be so jealous!",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {duration: 3000},
            dismissable: {click: true}
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDirector(e) {
        this.setState({
            director: e.target.value
        });
    }

    onChangeImg(e) {
        this.setState({
            img: e.target.value
        });
    }

    onStarClickChange(nextValue, prevValue, name) {
        this.setState({score: nextValue});
    }

    onChangeReleaseDate(date) {
        this.setState({
            release_date: new Date(date)
        })
    }

    getMovieData() {
        axios.get('http://localhost:8000/movies/' + this.movie_id).then((res) => {
            console.warn('MOVIEEEEE. ', res.data);
            const movie = res.data;
            this.setState({
                title: movie.title,
                description: movie.description,
                director: movie.director,
                slug: movie.slug,
                _id: movie._id,
                release_date: new Date(movie.release_date),
                img: movie.img,
                score: movie.score
            });
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('movie shal be pub');

        // console.log(`Form submitted:`);
        // console.log(`Title: ${this.state.title}`);
        // console.log(`Img: ${this.state.img}`);
        // console.log(`Description: ${this.state.description}`);
        // console.log(`Director: ${this.state.director}`);
        // console.log(`Score: ${this.state.score}`);
        // console.log(`Released: ${this.state.release_date}`);

        //if existing movie update
        if (this.state._id) {
            axios.post('http://localhost:8000/movies/update/'+this.state._id, this.state).then((res) => {
                console.log(res);
                this.addUpdatedNotification();
            }).catch((err) => {
                console.log("Movie not Updated! Following error: ", err);
            });
        }
        // otherwise publish new movie
        else{
            axios.post('http://localhost:8000/movies/add', this.state).then((res) => {
                console.log(res);
                this.addNotification();
                this.setState({
                    title: '',
                    description: '',
                    img: '',
                    director: '',
                    score: null,
                    slug: undefined,
                    release_date: new Date(),
                })
            }).catch((err) => {
                console.log("Movie not published! Following error: ", err);
            });
        }



    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="col-sm-8">

                            <div className="form-group">
                                <label>Movie Title: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle.bind(this)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description: </label>
                                <textarea
                                    rows='6'
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription.bind(this)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Img URL: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.img}
                                    onChange={this.onChangeImg.bind(this)}
                                />
                            </div>

                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label>Director: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.director}
                                    onChange={this.onChangeDirector.bind(this)}
                                />
                            </div>


                            <div className="form-group">
                                <label>Release Date: </label>
                                <br/>
                                <DatePicker
                                    onChange={this.onChangeReleaseDate.bind(this)}
                                    selected={this.state.release_date}

                                />

                            </div>
                            <div className="form-group">
                                <label>Rating score: </label>
                                <br/>
                                <StarRatingComponent style={{
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                    borderRadius: "4px"
                                }}
                                                     name="rate1"
                                                     starCount={5}
                                                     value={this.state.score}
                                                     emptyStarColor={'#fff'}
                                                     onStarClick={this.onStarClickChange.bind(this)}
                                />


                            </div>

                            <div className="form-group">

                                <input type="submit" value={this.state.button_label}
                                    className="btn btn-primary btn-block btn-lg"/>
                            </div>
                        </div>
                        <ReactNotification ref={this.notificationDOMRef}/>


                    </div>
                </form>
            </div>
        )
    }
}