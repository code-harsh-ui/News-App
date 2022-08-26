import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import LoadingBar from 'react-top-loading-bar'

export default class App extends Component { 

  //! Here we take a variable named "apiKey" which we are sending through the "NewsContainer" component as a prop to NewsContainer.js file and the api key we placed in env.local. file

  apiKey = process.env.REACT_APP_NEWS_API // this is how we can access env.local. file

  state = { progressState: 0 }
  setProgress = (progressPara) => {
    this.setState({ progressState: progressPara })

  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946' // string
            progress={this.state.progressState} // number
            height={7} // number
          />
          <Routes>
            <Route path="/"
            //! Here we are sending the props name "apiKey" from each Newscontainer component to the NewsContainer.js file component
              element={<NewsContainer progressProp={this.setProgress} apiKey = {this.apiKey} key='general' category='general' />}
            />
            <Route path="/business"
              element={<NewsContainer progressProp={this.setProgress} apiKey = {this.apiKey} key='business' category='business' />}
            />
            <Route path="/entertainment"
              element={<NewsContainer progressProp={this.setProgress} apiKey = {this.apiKey} key='entertainment' category='entertainment' />}
            />
            <Route path="/general"
              element={<NewsContainer progressProp={this.setProgress} apiKey = {this.apiKey} key='general' category='general' />}
            />
            <Route path="/health"
              element={<NewsContainer progressProp={this.setProgress} apiKey = {this.apiKey} key='health' category='health' />}
            />
            <Route path="/science"
              element={<NewsContainer progressProp={this.setProgress} apiKey = {this.apiKey} key='science' category='science' />}
            />
            <Route path="/sports"
              element={<NewsContainer progressProp={this.setProgress} key='sports' category='sports' />}
            />
            <Route path="/technology"
              element={<NewsContainer progressProp={this.setProgress} key='technology' category='technology' />}
            />
          </Routes>
        </Router>
      </>
    )
  }
}



