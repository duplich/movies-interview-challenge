import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {Link} from 'react-router-dom';


export default class Movie extends Component {
    constructor(props) {
        super(props);

        let movie = props.movie;
        this.state = {
            title: movie.title ? movie.title : "Default title",
            img: movie.img ? movie.img : "https://lorempixel.com/500/750",
            director: movie.director ? movie.director : 'Alec baldwin',
            rating: movie.score ? movie.score : 3,
            released: movie.release_date ? movie.release_date : '17/03/1978',
            id: movie._id ? movie._id : '#',
            slug: movie.slug
        }
    }

    getYear(_date) {
        const date = new Date(_date);
        return date.getFullYear();
    }

    render() {
        return (
            <div>

                <Link to={'movie/' + this.state.slug}>
                    <img className={'img-thumbnail'} src={this.state.img} alt={this.state.title + ' Image'}/>
                </Link>

                <div className='rating'>
                    <StarRatingComponent
                        name={this.state.title}
                        value={this.state.rating}
                        starCount={5}
                        editing={false}
                    />
                </div>
                <h2>{this.state.title}</h2>
                <h5>{this.state.director}</h5>
                <h5>{this.getYear(this.state.released)}</h5>

                <br/><br/>
            </div>


        )
    }
}