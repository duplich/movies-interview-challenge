import {Link} from "react-router-dom";
import React, {Component} from "react";

export default class HeaderNav extends Component {

        render(){
            return(
                <nav className="navbar navbar-expand-lg navbar-light navigation-bar">

                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Movies</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Movie</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
}

