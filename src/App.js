import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';

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
              element={<NewsContainer key='general' category='general' />}
            />
            <Route path="/business"
              element={<NewsContainer key='business' category='business' />}
            />
            <Route path="/entertainment"
              element={<NewsContainer key='entertainment' category='entertainment' />}
            />
            <Route path="/general"
              element={<NewsContainer key='general' category='general' />}
            />
            <Route path="/health"
              element={<NewsContainer key='health' category='health' />}
            />
            <Route path="/science"
              element={<NewsContainer key='science' category='science' />}
            />
            <Route path="/sports"
              element={<NewsContainer key='sports' category='sports' />}
            />
            <Route path="/technology"
              element={<NewsContainer key='technology' category='technology' />}
            />
          </Routes>
        </Router>
      </>
    )
  }
}



