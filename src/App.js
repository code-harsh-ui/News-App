import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';

//*----------- Routing --------------

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/"
              element={<NewsContainer key='general' category='general' head='Top Headlines'/>}
            />
            <Route path="/business"
              element={<NewsContainer key='business' category='business' head='Business News'/>}
            />
            <Route path="/entertainment"
              element={<NewsContainer key='entertainment' category='entertainment' head='Entertainment News'/>}
            />
            <Route path="/general"
              element={<NewsContainer key='general' category='general' head='General News'/>}
            />
            <Route path="/health"
              element={<NewsContainer key='health' category='health' head='Health News'/>}
            />
            <Route path="/science"
              element={<NewsContainer key='science' category='science' head='Science News'/>}
            />
            <Route path="/sports"
              element={<NewsContainer key='sports' category='sports' head='Sports News'/>}
            />
            <Route path="/technology"
              element={<NewsContainer key= 'technology' category='technology' head='Technology News'/>}
            />
          </Routes>
        </Router>
      </>
    )
  }
}



