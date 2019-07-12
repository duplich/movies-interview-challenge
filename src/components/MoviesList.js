import React, {Component} from 'react';
import Movie from "./TeaseMovie";
import axios from "axios";

export default class MoviesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: []
        }
    }

    componentDidMount(){

        this._isMounted = true;

        axios.get('http://localhost:8000/movies')
            .then((res) => {

                if (this._isMounted) {
                    console.log(res.data);
                    this.setState({ movies: res.data });
                }

            })
            .catch(function (error){
            console.log(error);
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <div className="row">
                {this.state.movies.map((movie,i) => {
                    return (
                    <div className="col-sm-4 col-md-3" key={ i.toString()}>
                        <Movie movie={movie} />
                    </div>
                    )
                })}
                </div>
            </div>
        )
    }
}