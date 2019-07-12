import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MoviesList from './components/MoviesList';
import CreateMovie from './components/CreateMovie';
import SingleMovie from './components/SingleMovie';
import HeaderNav from './components/HeaderNav'
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <div className="container">
                  <HeaderNav />
                  <br/>
                  <Route path="/" exact component={MoviesList} />
                  <Route path="/movie/:id"  component={SingleMovie} />
                  <Route path="/edit/:id" component={CreateMovie} />
                  <Route path="/create" component={CreateMovie} />
              </div>
          </Router>


      </header>
    </div>
  );
}

export default App;
